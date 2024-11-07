import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

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
      Bucket: 'workflow-bucket',
      Key: filename,
      Body: buffer,
    };
    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }
}
