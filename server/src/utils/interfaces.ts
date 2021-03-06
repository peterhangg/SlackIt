import { File } from  './types';

export interface Upload {
  file: File;
}
export interface ICloudinary {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
}

export interface ICloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}
