import { URL } from "./Globals/Constants";

import io from "socket.io-client";


export const socket=io(URL)