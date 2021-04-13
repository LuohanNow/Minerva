/* eslint-disable */
import { 
  AppBar, Button, Grid, IconButton, InputBase, List, ListItem, ListItemSecondaryAction, 
  ListItemText, TextField, Toolbar, Typography } 
from '@material-ui/core';
import { ApiService } from './ApiService';
import { MarkdownEditor } from './components/MarkdownEditor/MarkdownEditor';
import { Document, DocumentWithoutId } from './models/Document';
import { AccountCircle, Edit, Delete, Menu, Search } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import "./App.scss";

function App() {

  function randText(): string {
    return Math.random().toString(36).substring(7);
  }

  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [title, setTitle] = useState<string>("");

  function getAllDocuments(): Array<Document> {
    const apiService = new ApiService(); 
  
    void (async () => {
        apiService.GetAllDocuments()
        .then(result => {
          setDocuments(result);
        }); 
    })();
    return documents;
  }

  function updateDocumentById(id: string, documentBody: DocumentWithoutId): void {
    const apiService = new ApiService(); 
  
    void (async () => {
        apiService.UpdateDocumentById(id, documentBody)
        .then(isOk => {
          console.log(isOk);
        }); 
    })();
  }

  function addNewDocument(documentBody: DocumentWithoutId): void {
    const apiService = new ApiService(); 
  
    void (async () => {
        apiService.AddDocument(documentBody)
        .then(result => {
          setDocuments([...documents, result]);
        }); 
    })();
  }

  function deleteDocumentById(id: string): void {
    const apiService = new ApiService(); 
  
    void (async () => {
        apiService.DeleteDocumentById(id)
        .then(isOk => {
          if(isOk) {
            console.log(isOk);
          }
        }); 
    })();
  }

  useEffect(() => {
    getAllDocuments();
  }, []); 

  const markdownEditor = useRef<MarkdownEditor>(null);

  const handleListItemClick = ( event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    markdownEditor.current?.vditor.setValue(JSON.stringify(documents[index],null,2));
    setTitle(documents[index].title);
  };

  const handleButtonEditItemClick = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {

    const idDocument = documents[index]._id;
    const randomText = randText();
    documents[index].title = randomText
    setDocuments([...documents]);

    const data: DocumentWithoutId = {
      url: "Какой-то URL",
      title: randomText,
      subtitle: "",
      body: "this is just demonstration  update test",
      tags: ["test", "test2", "test3"],
      updated: "03/21/2021 04:11",
      created: "03/21/2021 04:11",
      lastEditedBy: "emperor update",
      markup: "markdown",
      lastEditBy:"",
      docHistory: ""
    };
  
    updateDocumentById(idDocument, data);
  };

  function addDocument(): void {
    
    const data: DocumentWithoutId = {
      url: randText(),
      title: randText(),
      subtitle: randText(),
      body: randText(),
      tags: [randText(), randText(), randText()],
      updated: "03/21/2021 04:11",
      created: "03/21/2021 04:11",
      lastEditedBy:randText(),
      markup: "markdown",
      lastEditBy:"",
      docHistory: ""
    };

    addNewDocument(data);
  }

  const handleButtonDeleteItemClick = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    const idDocument = documents[index]._id;
    deleteDocumentById(idDocument);
    setDocuments(documents.filter(item => item !== documents[index]));
  };

  function handleChangeTitle(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    setTitle(e.target.value);
  }
    
  return (
    <div className="App">
      <div> 
        <Grid container>
          <Grid item xs={12}>
          <div className="main-appbar">
            <AppBar color="primary" position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit">
                <Menu />
              </IconButton>
              <Typography variant="h5">
                {"Minerva"}
              </Typography>
              <div className="main-toolbar-search">
                <div className="search-icon">
                  <Search />
                </div>
                <InputBase
                  placeholder="Search…"
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
                      onClick={(event) => handleListItemClick(event, index)}
                    >
                    <ListItemText
                      primary={item.title}
                    />
                    <ListItemSecondaryAction>
                    <IconButton onClick={(event) => handleButtonEditItemClick(event, index)} edge="end" aria-label="edit">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={(event) => handleButtonDeleteItemClick(event, index)} edge="end" aria-label="delete">
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
          <div className="document-title">
            <TextField onChange={handleChangeTitle} 
              value={title} 
              label="Заголовок документа" 
              variant="outlined" 
              fullWidth
            />
          </div>
          <div className="markdown-editor">
            <MarkdownEditor ref={markdownEditor}/>
          </div>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default App;
