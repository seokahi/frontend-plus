import { ChangeEvent } from "react";

interface FileImgProps {
    setFileImg: (FileImg:File|null) => void;
}


const ProfileImgInput:React.FC<FileImgProps> = ({setFileImg}) => {

    return (
        <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="profileImage">프로필 이미지</label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                setFileImg(e.target.files[0]);
            }
        }}
        />
      </div>
    )
}

export default ProfileImgInput