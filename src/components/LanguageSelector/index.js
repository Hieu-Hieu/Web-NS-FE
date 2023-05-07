export { default } from "./LanguageSelector";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Tooltip from "@mui/material/Tooltip";
// import PersonAdd from "@mui/icons-material/PersonAdd";
// import Settings from "@mui/icons-material/Settings";
// import Logout from "@mui/icons-material/Logout";
// import GTranslateIcon from "@mui/icons-material/GTranslate";
// import { Select } from "@mui/material";

// export default function LangSelector() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [lang, setLang] = React.useState(() => {
//     return localStorage.getItem("locale") || "vi";
//   });
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = (lang) => {
//     if (lang) {
//       setLang(lang);
//       setAnchorEl(null);
//       localStorage.setItem("locale", lang);
//       window.location.reload();
//     }
//   };

//   const handleChange = (event) => {
//     setLang(event.target.value);
//     setAnchorEl(null);
//   };

//   return (
//     <React.Fragment>
//       <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
//         <Tooltip title="Account settings">
//           <GTranslateIcon
//             onClick={handleClick}
//             size="small"
//             sx={{ ml: 2 }}
//             aria-controls={open ? "account-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//           ></GTranslateIcon>
//         </Tooltip>
//       </Box>
//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleClose}
//         // onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             overflow: "visible",
//             filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//             mt: 1.5,
//             "& .MuiAvatar-root": {
//               width: 32,
//               height: 32,
//               ml: -0.5,
//               mr: 1,
//             },
//             "&:before": {
//               content: '""',
//               display: "block",
//               position: "absolute",
//               top: 0,
//               right: 14,
//               width: 10,
//               height: 10,
//               bgcolor: "background.paper",
//               transform: "translateY(-50%) rotate(45deg)",
//               zIndex: 0,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         <MenuItem
//           onClick={() => {
//             handleClose("vi");
//           }}
//           selected={lang == "vi"}
//           value="vi"
//         >
//           Tiếng việt
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleClose("en");
//           }}
//           selected={lang == "en"}
//           value="en"
//         >
//           English
//         </MenuItem>
//         {/* <Select
//           labelId="Ngôn ngữ"
//           id="lang-sêlct"
//           value={lang}
//           onChange={handleChange}
//           label="lang"
//         >
//           <MenuItem value={"vi"}> Tiếng việt</MenuItem>
//           <MenuItem value={"en"}> English</MenuItem>
//         </Select> */}
//       </Menu>
//     </React.Fragment>
//   );
// }
