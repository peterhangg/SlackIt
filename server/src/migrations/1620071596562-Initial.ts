import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1620071596562 implements MigrationInterface {
    name = 'Initial1620071596562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "direct_message"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "direct_message"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "team"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "message"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "message"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "channel"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "channel"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "channel"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "channel"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "message"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "message"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "team"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "direct_message"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "direct_message"."createdAt" IS NULL`);
    }

}
