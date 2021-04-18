/* eslint-disable */
import { 
  AppBar, Button, createMuiTheme, Grid, IconButton, InputBase, List, ListItem, ListItemSecondaryAction, 
  ListItemText, TextField, ThemeProvider, Toolbar, Typography } 
from '@material-ui/core';
import { ApiService } from './ApiService';
import { MarkdownEditor } from './components/MarkdownEditor/MarkdownEditor';
import { Document } from './models/Document';
import { AccountCircle, Delete, Menu, Save, Search } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import "./App.scss";
import { green } from '@material-ui/core/colors';
import { t } from './localization';

const theme = createMuiTheme({
  typography: {
    fontSize: 16,
    fontFamily: [
      `"Roboto", "Helvetica", "Arial", sans-serif`,
    ].join(','),
    fontWeightRegular: 400,
},
  palette: {
    primary: green,
  },
});

function App() {
  const markdownEditor = useRef<MarkdownEditor>(null);
  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [editingDocument, setEditingDocument] = useState<Document>({
    body: " ",
    created: new Date().toString(),
    docHistory: " ",
    lastEditBy: " ",
    lastEditedBy: " ",
    markup: " ",
    subtitle: " ",
    tags: [],
    title: " ",
    updated: new Date().toString(),
    url: " ",
    _id: ""
  });

  /**
   * Load all documents on mount component
   */
  useEffect(() => {
    const apiService = new ApiService(); 
    void (async () => {
      const result = await apiService.GetAllDocuments()
      setDocuments(result);
    })();
  }, []); 

  /**
   * Load document to markdown editor 
   * when editingDocument change
   */
  useEffect(() => {
    try {
      markdownEditor.current?.vditor.setValue(editingDocument.body);
    } catch (error) {}
  }, [editingDocument._id]); 


  const documentListItemClick = ( event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setEditingDocument(documents[index]);
  };

  function saveDocument(): void {
    const apiService = new ApiService();

    editingDocument.body = markdownEditor.current?.vditor.getValue(); 
    editingDocument.updated = new Date().toString(); 

    const { ["_id"]: id, ...savingDocument } = editingDocument;

    // if id define then update document
    // else add new
    if (id) {
      void (async () => {
      const isDocumentUpdated = await apiService.UpdateDocumentById(id, savingDocument);
      
      if(isDocumentUpdated) {
        let updatedDocument = documents.find(document => document._id === id);

        if (updatedDocument) {
          updatedDocument.body = savingDocument.body;
          updatedDocument.created = savingDocument.created;
          updatedDocument.docHistory = savingDocument.docHistory;
          updatedDocument.lastEditBy = savingDocument.lastEditBy;
          updatedDocument.lastEditedBy = savingDocument.lastEditedBy;
          updatedDocument.markup = savingDocument.markup;
          updatedDocument.subtitle = savingDocument.subtitle;
          updatedDocument.tags = savingDocument.tags;
          updatedDocument.title = savingDocument.title;
          updatedDocument.updated = savingDocument.updated;
          updatedDocument.url = savingDocument.url;
          setDocuments([...documents]);
        }
      }
      })();
    }
    else {
      void (async () => {
        const result = await apiService.AddDocument(savingDocument)
        setDocuments([...documents, result]);
      })();
    }
  }

  /**
   * Delete document
   * @param event 
   * @param index 
   */
  const deleteDocument = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    const idDocument = documents[index]._id;
    const apiService = new ApiService();

    void (async () => {
      apiService.DeleteDocumentById(idDocument)
      .then(isOk => {
        if(isOk) {
          setDocuments(documents.filter(item => item !== documents[index]));
        }
      }); 
    })();
  };

  function handleChangeTitle(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    setEditingDocument({...editingDocument, title: e.target.value});
  }
    
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item xs={12}>
          <div className="main-appbar">
            <AppBar color="primary" position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit">
                <Menu />
              </IconButton>
              <Typography variant="h5" >
                {"Minerva"}
              </Typography>
              <div className="main-toolbar-search">
                <div className="search-icon">
                  <Search />
                </div>
                <InputBase
                  placeholder={t("search")}
                  className="search-field"
                />
              </div>
              <IconButton edge = "end"
                  color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        </Grid>
        <Grid item xs={3}>
          <div className="document-list">
          <List dense={true}>
                {documents.map( (item, index) => {
                  return(
                    <div className="document-list-item">
                    <ListItem  
                      key={item._id} 
                      button
                      onClick={(event) => documentListItemClick(event, index)}
                    >
                    <ListItemText
                      primary={item.title}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={(event) => deleteDocument(event, index)} edge="end" aria-label="delete">
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  </div>
                  )}
                )}
          </List>
          </div>
        </Grid>
        <Grid item xs={9}>
        <Grid container>
          <Grid className="document-title" item xs={10}>
            <TextField onChange={handleChangeTitle} 
                value={editingDocument.title} 
                label= {t("document-title")}
                variant="outlined" 
                fullWidth
            />
          </Grid>
          <Grid className="btn-save" item xs={2}>
            <Button variant="contained" 
              color="primary"
              startIcon={<Save />}
              onClick={saveDocument}
            >
                {t("save")}
            </Button>
          </Grid>
        </Grid>
        <div className="markdown-editor">
          <MarkdownEditor ref={markdownEditor}/>
        </div>
        </Grid>
      </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
