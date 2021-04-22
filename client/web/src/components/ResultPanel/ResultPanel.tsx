import "./ResultPanel.scss"
import { Button, InputBase, List, ListItem, ListItemText } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { t } from '../../localization';
import { Document } from "../../models/Document";
import { KeyboardEvent } from "react";

type ResultPanelProps = {
  documentItems: Array<Document>;
  onResultItemClick(id: string): void;
  onSearch(searchText: string): void;
}

export function ResultPanel(props: ResultPanelProps) {
  function onEnterKeyDown(e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    if(e.code === "Enter")
      props.onSearch(e.currentTarget.value as string);
  }

  return (
    <div className="result-panel">
        <div className="search">
          <div className="search-icon">
            <Search />
          </div>
          <InputBase
            onKeyDown={onEnterKeyDown}
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
