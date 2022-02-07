import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { Theme } from "../../../common/theme/theme";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { SaveButton } from "../../ToDoList/buttons/SaveButton";
import { CancelButton } from "../../ToDoList/buttons/CancelButton";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../../userContext/UserContext";
import { useContext } from "react";
import { Container, Icon, OutlinedInput, TextField } from "@mui/material";
import { border } from "@mui/system";
import { TextFieldReadOnly } from "../text-field/TextFieldReadOnly";
import { TextFieldView } from "../text-field/TextFieldView";
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
        sx={{ width: "200px", height: "200px" }}
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