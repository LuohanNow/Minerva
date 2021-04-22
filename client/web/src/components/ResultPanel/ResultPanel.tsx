import "./ResultPanel.scss"
import { InputBase, List, ListItem, ListItemText } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { t } from '../../localization';
import { Document } from "../../models/Document";

type ResultPanelProps = {
  documentItems: Array<Document>;
  onResultItemClick(id: string): void;
}

export function ResultPanel(props: ResultPanelProps) {
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
        {props.documentItems.map( (item) => {
              return(  
                <ListItem button onClick={() => props.onResultItemClick(item._id)} >
                  <ListItemText
                    primary={item.title}
                  />
                </ListItem>
              )}
            )} 
        </List>
    </div>
  );
}
