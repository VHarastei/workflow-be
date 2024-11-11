import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CreateFileDto } from '../file/dto/create-file.dto';

@Injectable()
export class DigitalOceanService {
  private s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      s3ForcePathStyle: false,
      endpoint: process.env.DIGITALOCEAN_ENDPOINT,
      accessKeyId: process.env.DIGITALOCEAN_ACCESS_KEY,
      secretAccessKey: process.env.DIGITALOCEAN_SECRET_KEY,
      region: process.env.DIGITALOCEAN_REGION,
    });
  }
  async uploadFile(buffer: Buffer, filename: string): Promise<string> {
    const params = {
      Bucket: process.env.DIGITALOCEAN_BUCKET,
      Key: filename,
      Body: buffer,
    };
    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }

  async uploadFiles(path: string, files: Array<Express.Multer.File>): Promise<CreateFileDto[]> {
    if (!files) return [];

    const promises = files.map(async (file) => {
      const filename = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const fullPath = `${path}-${filename}`;

      await this.uploadFile(file.buffer, fullPath);

      return {
        path: fullPath,
        filename,
        mimetype: file.mimetype,
        size: file.size,
      };
    });

    return Promise.all(promises);
  }

  async getPresignedUrl(fileKey: string, params?: any) {
    const requestParams = {
      Bucket: process.env.DIGITALOCEAN_BUCKET,
      Key: fileKey,
      ...params,
    };

    return this.s3.getSignedUrlPromise('getObject', requestParams);
  }
}
