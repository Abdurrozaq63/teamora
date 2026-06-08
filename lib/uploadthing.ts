// import { generateReactHelpers } from '@uploadthing/react';

// import type { OurFileRouter } from '@/app/api/uploadthing/core';

// export const { useUploadThing, uploadFiles } =
//   generateReactHelpers<OurFileRouter>();
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  taskSubmissionUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 5,
    },
    pdf: {
      maxFileSize: '8MB',
      maxFileCount: 5,
    },
    text: {
      maxFileSize: '4MB',
      maxFileCount: 5,
    },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.url,
        name: file.name,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
