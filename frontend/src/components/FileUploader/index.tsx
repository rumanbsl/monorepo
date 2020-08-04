import styled from "styled-components";

type FileSrc = string | ArrayBuffer;

export interface FileUploaderProps {
  onUpload: (pl: {src: FileSrc|FileSrc[], filename: string})=> void;
  accept: "audio/*"|"video/*"|"image/*"|"media_type"
  multiple?: boolean
  src?: FileSrc;
}

const Uploader = styled.form`
  background: inherit;
  border: 0;

  label > *:not(first-child) {
    cursor: pointer;
  }

  label > input:first-child {
    display: none;
  }
`;

const FileUploader:React.SFC<FileUploaderProps> = ({ children, onUpload, accept, multiple = false }) => {
  const filesStr: (string | ArrayBuffer)[] = [];

  const onChange = (pl: {files: FileList|null; multiple: boolean}) => {
    if (!pl.files) return false;
    const filesArr = Array.from(pl.files);

    filesArr.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        if (e.target?.result) {
          filesStr.push(e.target.result);
          if (filesArr.length === filesStr.length) {
            if (multiple) onUpload({ src: filesStr, filename: file.name });
            else onUpload({ src: filesStr[0], filename: file.name });
          }
        }
      };
      reader.readAsDataURL(file);
    });

    return true;
  };

  return (
    <Uploader encType="multipart/form-data">
      <label htmlFor="file-uploader">
        <input
          multiple={multiple}
          type="file"
          accept={accept}
          onChange={(e) => { filesStr.splice(0); onChange({ files: e.target.files, multiple }); }}
          id="file-uploader"
        />
        {children}
      </label>
    </Uploader>
  );
};
export default FileUploader;
