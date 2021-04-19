import { Document } from '../../models/Document';
import "./ListDocuments.scss"
import { StyledTreeItem } from '../StyledTreeItem/StyledTreeItem';
import { TreeView } from '@material-ui/lab';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Book, Note, LabelImportant, LocalOffer} from '@material-ui/icons';

type ListDocumentsProps = {
  documentItems: Array<Document>;
  onDocumentItemClick(id: string): void;
  tagsItems: Array<string>;
}

export function ListDocuments(props: ListDocumentsProps) {
  return (
    <div className="document-list">
      <TreeView
        defaultExpanded={['1','2']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
      >
        <StyledTreeItem nodeId="1"
          labelText="Список документов" 
          labelIcon={Book}>
            {props.documentItems.map( (item) => {
              return(  
                <StyledTreeItem
                  onClick={() => props.onDocumentItemClick(item._id)}
                  key={item._id}
                  nodeId={item._id}
                  labelText={item.title}
                  labelIcon={Note}
                />
              )}
            )} 
        </StyledTreeItem>
        <StyledTreeItem nodeId="2" 
          labelText="Теги" 
          labelIcon={LocalOffer}>
            {props.tagsItems.map( (item, index) => {
              return(  
                <StyledTreeItem
                  nodeId={`tag${index}`}
                  labelText={item}
                  labelIcon={LabelImportant}
                />
              )}
            )} 
        </StyledTreeItem>
      </TreeView>
    </div>
  );
}
