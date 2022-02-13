import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { Theme } from "../../../common/theme/theme";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../../userContext/UserContext";
import { useContext } from "react";
import { Icon, TextField } from "@mui/material";

import styled from "@emotion/styled";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const UserAvatar = () => {
  const [file, setFile] = useState(null);

  const handleChange = e => {
    setFile(e.target.files[0]);
    console.log(e.target.files);
  };

  const handleCancelClick = () => {
    setFile(null);
  };
  const { user, avatarUrl, setAvatarUrl } = useContext(UserContext);
  const handleSaveClick = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `avatars/${user.uid}`);

    uploadBytes(storageRef, file).then(snapshot => {
      getDownloadURL(storageRef).then(url => {
        setAvatarUrl(url);
        setFile(null);
        console.log(url);
      });
    });
  };

  return (
    <>
      <Avatar
        sx={{
          width: "200px",
          height: "200px",
          backgroundColor: "black",
          padding: "2px",
        }}
        variant="square"
        src={avatarUrl}
        alt="avatar"
      />
      <Button
        component="label"
        variant="outlined"
        color="primary"
        sx={{
          margin: "1rem",
          height: "3rem",
          color: Theme.palette.primary,
          backgroundColor: Theme.palette.secondary.contrastText,
          ":hover": { backgroundColor: Theme.palette.primary.contrastText },
        }}>
        <AddPhotoAlternateIcon />
        <input onChange={handleChange} type="file" hidden />
      </Button>

      {file && (
        <>
          <div>
            <TextField multiline fullWidth value={file.name}></TextField>
          </div>

          <ButtonsContainer>
            <Button
              sx={{
                color: Theme.palette.secondary.contrastText,
                ":hover": { color: Theme.palette.primary.contrastText },
              }}
              color="secondary"
              onClick={handleSaveClick}>
              <Icon>save</Icon>
            </Button>
            <Button
              sx={{
                color: Theme.palette.secondary.contrastText,
                ":hover": { color: Theme.palette.primary.contrastText },
              }}
              color="secondary"
              onClick={handleCancelClick}>
              <Icon>cancel</Icon>
            </Button>
          </ButtonsContainer>
        </>
      )}
    </>
  );
};
