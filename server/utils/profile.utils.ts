import { User } from "../models/user.model";
import { Profile } from "../models/profile.model";

const profileMapper = (user: any, username: string | undefined): Profile => ({
  username: user.username,
});

export default profileMapper;
