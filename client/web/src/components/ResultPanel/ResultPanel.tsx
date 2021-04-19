import "./ResultPanel.scss"
import { InputBase, List, ListItem, ListItemText } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { t } from '../../localization';


export function ResultPanel() {
  return (
    <div className="result-panel">
        <div className="search">
          <div className="search-icon">
            <Search />
          </div>
          <InputBase
            placeholder={t("search")}
            className="search-field"
          />
        </div>
        <List dense={true}>
            <ListItem  
              button
            >
            <ListItemText
              primary={"Здесь"}
            />
          </ListItem>
          <ListItem  
              button
            >
            <ListItemText
              primary={"Результаты"}
            />
          </ListItem>
          <ListItem  
              button
            >
            <ListItemText
              primary={"Поиска"}
            />
          </ListItem>
        </List>
    </div>
  );
}
