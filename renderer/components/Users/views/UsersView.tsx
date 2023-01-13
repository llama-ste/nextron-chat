import styled from "@emotion/styled";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import Empty from "../../Common/Empty";

import LoadingBar from "../../Common/Loadingbar";
import { IUsersProps } from "../types";

const SubHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: sticky; */
  /* top: 0; */
  /* z-index: 100; */
  background-color: #fff;
`;

const UsersView = ({
  onGroupMode,
  onCheckUser,
  onCreateChatRoom,
  onCreateGroupChatRoom,
  usersList,
  totalUser,
  groupMode,
  isLoading,
  isEmpty,
}: IUsersProps) => {
  if (isLoading) return <LoadingBar isLoading={isLoading} />;
  if (isEmpty) return <Empty text="다른 유저가 없습니다." />;

  return (
    <List
      subheader={
        <SubHeaderWrapper>
          <ListSubheader>유저 {totalUser}</ListSubheader>
          {/* <ListSubheader>
            {groupMode && (
              <Button
                onClick={onGroupMode}
                sx={{ fontWeight: "bold" }}
                variant="outlined"
                size="small"
                color="inherit"
              >
                취소
              </Button>
            )}
            <Button
              onClick={groupMode ? onCreateGroupChatRoom : onGroupMode}
              sx={{ fontWeight: "bold", marginLeft: "6px" }}
              variant="contained"
              size="small"
            >
              {groupMode ? "선택완료" : "그룹채팅"}
            </Button>
          </ListSubheader> */}
        </SubHeaderWrapper>
      }
    >
      {usersList.map((user) => {
        return (
          <ListItem
            key={user.uid}
            secondaryAction={
              groupMode ? (
                <Checkbox onClick={() => onCheckUser(user)} />
              ) : (
                <Button
                  onClick={() => onCreateChatRoom(user)}
                  variant="outlined"
                  size="small"
                >
                  1:1채팅
                </Button>
              )
            }
          >
            <ListItemAvatar>
              <Avatar>{user.avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.nickname} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default UsersView;
