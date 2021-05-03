import React, { useEffect } from 'react';
import { InputStyles, PageHeader } from './styles/shared';
import {
  useGetTeamQuery,
  useGetTeamUsersLazyQuery,
} from '../src/generated/graphql';
import Link from 'next/link';
import {
  UserIconWrapper,
  UserIcon,
  MessageAvatarStyles,
  MessageAvatarWrapper,
} from './styles/Messages';
import useForm from '../src/utils/useForm';
import { Dispatcher } from '../src/utils/types';
import {
  ClosedModalButton,
  ModalWrapper,
  TeamListContainer,
  TeamListItems,
} from './styles/MemberModal';

interface MembersModalProps {
  teamId: number;
  showMembersModal: boolean;
  setShowMembersModal: Dispatcher<boolean>;
}

const MembersModal: React.FC<MembersModalProps> = ({
  teamId,
  showMembersModal,
  setShowMembersModal,
}) => {
  const { data } = useGetTeamQuery({
    variables: { teamId },
    skip: !teamId,
  });

  const [searchQuery, { data: membersData }] = useGetTeamUsersLazyQuery({
    variables: { teamId },
  });
  const { inputs, handleChange } = useForm({
    name: '',
  });

  const teamMembers = membersData?.getTeamUsers;
  const teamData = data?.getTeam;

  // FETCH ALL TEAM USERS WHEN CHANGING TEAMS
  useEffect(() => {
    searchQuery({ variables: { teamId, searchMember: '' } });
  }, [teamId]);

  // TEAM SEARCH ON INPUT CHANGE
  useEffect(() => {
    const handler = setTimeout(() => {
      searchQuery({ variables: { teamId, searchMember: inputs.name } });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputs.name, searchQuery]);

  const closeModal = () => {
    setShowMembersModal(false);
    inputs.name = '';
  };

  return (
    <>
      {showMembersModal && (
        <ModalWrapper>
          <PageHeader>{`${teamData?.users.length} members in ${teamData?.name}`}</PageHeader>
          <InputStyles
            type="search"
            name="name"
            onChange={handleChange}
            placeholder="Search team"
          />
          <TeamListContainer>
            {teamMembers?.map((user) => (
              <Link
                key={`member-${user.id}`}
                href="/dashboard/[teamId]/user/[userId]"
                as={`/dashboard/${teamId}/user/${user.id}`}
              >
                <TeamListItems onClick={closeModal}>
                  {user.avatar ? (
                    <MessageAvatarWrapper>
                      <MessageAvatarStyles
                        src={user.avatar}
                        alt="profile avatar"
                      />
                    </MessageAvatarWrapper>
                  ) : (
                    <UserIconWrapper>
                      <UserIcon>
                        {user.username.charAt(0).toUpperCase()}
                      </UserIcon>
                    </UserIconWrapper>
                  )}
                  <h3>{user.username}</h3>
                </TeamListItems>
              </Link>
            ))}
          </TeamListContainer>
          <ClosedModalButton onClick={closeModal}>x</ClosedModalButton>
        </ModalWrapper>
      )}
    </>
  );
};

export default MembersModal;
