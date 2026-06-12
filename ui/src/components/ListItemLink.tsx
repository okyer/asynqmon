import { ReactElement, forwardRef, useMemo } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "tss-react/mui";
import {
  Link,
  useLocation,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { isDarkTheme } from "../theme";

const useStyles = makeStyles()((theme) => ({
  listItem: {
    borderTopRightRadius: "24px",
    borderBottomRightRadius: "24px",
    color: theme.palette.text.primary,
  },
  selected: {
    backgroundColor: isDarkTheme(theme)
      ? `${theme.palette.secondary.main}30`
      : `${theme.palette.primary.main}30`,
  },
  selectedText: {
    fontWeight: 600,
    color: isDarkTheme(theme)
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
  },
  selectedIcon: {
    color: isDarkTheme(theme)
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
  },
}));

interface Props {
  to: string;
  primary: string;
  icon?: ReactElement;
}

const CustomLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function CustomLink(itemProps, ref) {
    return <Link ref={ref} {...itemProps} />;
  },
);

function ListItemLink(props: Props): ReactElement {
  const { classes } = useStyles();
  const { icon, primary, to } = props;
  const location = useLocation();

  const isMatch = useMemo(() => {
    return location.pathname === to || location.pathname === to + "/";
  }, [location.pathname, to]);

  return (
    <li>
      <Tooltip title={primary} placement="right">
        <ListItem
          component={CustomLink}
          to={to}
          className={
            isMatch
              ? `${classes.listItem} ${classes.selected}`
              : classes.listItem
          }
        >
          {icon && (
            <ListItemIcon
              className={isMatch ? classes.selectedIcon : undefined}
            >
              {icon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={primary}
            className={isMatch ? classes.selectedText : undefined}
          />
        </ListItem>
      </Tooltip>
    </li>
  );
}

export default ListItemLink;
