import * as unzipper from 'unzipper';
import { getMimeTypeFromName } from './getMimeTypeFromName';

export const dumpUnzipperFileToMulterFile = async (
  file: unzipper.File,
  filename: string,
  mimetype: string,
): Promise<Express.Multer.File> => {
  const buffer = await file.buffer();

  return {
    // ...file,
    buffer,
    originalname: filename,
    filename: filename,
    fieldname: filename,
    mimetype: mimetype || getMimeTypeFromName(filename),
    encoding: '7bit',
    destination: '',
    path: file.path,
    stream: file.stream(),
    size: file.uncompressedSize ?? 0,
  };
};
