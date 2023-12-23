import React , { useState } from 'react';
import { Container, Row, Col, Dropdown, Button as B_Button } from 'react-bootstrap';
import {InputAdornment, FormControlLabel,Select,Modal, FormControl, InputLabel, NativeSelect, TextField, Typography,Checkbox ,Accordion,AccordionSummary, AccordionDetails,} from '@material-ui/core';
import { Link as MuiLink, MenuItem, Menu, Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {    FileCopy as CopyIcon, GetApp as DownloadIcon } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/Close';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

//import { getCheckCitation } from '../../services/citationService';
import citationService from '../../services/citationService';



const Citation1 = () => {

  const citations = [
    {
      "JournalArticle": {
        "articleTitle": "Know Better Than Anyone",
        "fullCitation": "G. (2023). Know better than anyone. Knowbetterthananyone",
        "inTextCitation": "(G, 2023)"
      }
    },
    {
      "JournalArticle": {
        "articleTitle": "The Art of Knowledge",
        "fullCitation": "Author B. (2023). The Art of Knowledge. Journal of Knowledge Studies",
        "inTextCitation": "(Author B, 2023)"
      }
    }
  ];



  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [citationStyle, setCitationStyle] = useState('');
  // const [searchInput, setSearchInput] = useState('');
  const[text,setText]=useState('');
  const [websiteData, setWebsiteData] = useState(null);

  const handleCiteButtonClick = async () => {
    
    try {
      const response = await citationService.getCheckCitation(text)

      console.log('Backend Response:', response);

    } catch (error) {
      console.error('Error calling backend API:', error.message);
    }

    const fetchedWebsiteData = {
      websiteName: 'Sample Website',
      tagline: 'Explore the World of Samples',
    };

    setWebsiteData(fetchedWebsiteData);
  };

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseAccordion = () => {
    setWebsiteData(null);
  };


  const modalhandleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    // Handle form submission logic here
    e.preventDefault();
    handleClose();
  };

  

  return (
    <>
    <div style={{minWidth:'900px', maxWidth:'900px'}}>
      <Container fluid>
        <Row className="text-center py-3">
          <Col>
            <h3 className="citation-generator">Citation Generator</h3>
          </Col>
        </Row>

        <Row
      style={{
        width: '900px',
        zIndex: 1000,
        height: '72.4px',
        top: '173px',
        left: '306px',
        borderRadius: '15px',
        border: '1px solid #9F9F9F',
        backgroundColor: '#FFFFFF',
        paddingTop: '9px',
        paddingLeft: '6px',
        paddingRight: '6px',
        boxShadow: '3px 1px 8px 0px rgba(0,0,0,0.25)',
        marginLeft: 'auto',  // Align to the right
        marginRight: 'auto', // Align to the left
      }}
      className="citation-accordion"
    >
      <Col xs={2}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Citation Style
          </InputLabel>
          <NativeSelect
            value={citationStyle}
            onChange={(e) => setCitationStyle(e.target.value)}
            fullWidth
          >
            <option value="AMA 10th edition">AMA 10th edition</option>
            <option value="American Chemical Society">American Chemical Society</option>
            <option value="APA 11th edition">APA 11th edition</option>
            <option value="APA 6th edition">APA 6th edition</option>
            <option value="APA 7th edition">APA 7th edition</option>
            <option value="Chicago author">Chicago author</option>
          </NativeSelect>
        </FormControl>
      </Col>

      <Col xs={9}>
        <FormControl fullWidth>
          <TextField
            id="standard-search"
            label="Cite a webpage, book, article, and more"
            placeholder="Search by title, URL, DOI, ISBN, or keywords"
            type="search"
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormControl>
      </Col>

      <Col xs={1}>
        <B_Button style={{ marginTop: '10px' }} variant="primary" onClick={handleCiteButtonClick}>
          Cite
        </B_Button>
      </Col>

      {websiteData && (
        <Accordion style={{ width: '100%', zIndex: 1001 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{websiteData.websiteName}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ position: 'relative' }}>
  <Typography>{websiteData.tagline}</Typography>

  {/* Save Icon */}
  <IconButton
    style={{ position: 'absolute', bottom: '10px', right: '40px' }}
    onClick={() => {
      
    }}
  >
    <AssignmentTurnedInIcon />
  </IconButton>

  {/* Copy Icon */}
  <IconButton
    style={{ position: 'absolute', bottom: '10px', right: '10px' }}
    onClick={() => {
      // Add logic for copying here
    }}
  >
    <CopyIcon />
  </IconButton>
  <IconButton
              style={{ position: 'absolute', top: '10px', right: '10px' }}
              onClick={handleCloseAccordion}
            >
              <ExpandLessIcon />
            </IconButton>
</AccordionDetails>
        </Accordion>
      )}
    </Row>
      </Container>

      <Container fluid style={{ marginTop: '10px' }}>
      <Row xs={12} className="justify-content-between">
      <Col>
          <MuiLink
            style={{ marginLeft: '10px' }}
            component="button"
            variant="body2"
            onClick={handleButtonClick}
            color="textSecondary"
            underline="always"
          >
            Upload Document
          </MuiLink>
          <Menu
            id="upload-document"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose()}>Computer</MenuItem>
            <MenuItem onClick={() => handleClose()}>MS Word</MenuItem>
            <MenuItem onClick={() => handleClose()}>PDF</MenuItem>
            <MenuItem onClick={() => handleClose()}>Google Docs</MenuItem>
          </Menu>
        </Col>


  <Col xs="auto">
    <MuiLink
      component="button"
      variant="body2"
      onClick={handleOpen}
      color="primary"
      marginRight="20px"
      
    >
      Cite Manually
    </MuiLink>


    {/* /////////////////////////////////////////////////////////////////////////
    /////////////MODAL/////////////////////////////////////////////////////// */}



    <Modal
  open={open}
  onClose={modalhandleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
  <div
style={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '10px 60px',  // Adjust padding left and right
  borderRadius: '8px',
  minWidth: '70%',  // Decrease width
  fontSize: '10px',  // Decrease font size
}}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <div>
        <h2 id="simple-modal-title">Webpage</h2>
        {/* Add dropdown here */}
      </div>
      <IconButton onClick={modalhandleClose} color="secondary">
              <CloseIcon />
            </IconButton>
    </div>

    {/* Divider line */}
    <hr style={{ margin: '5px 0' }} />
<form onSubmit={handleSubmit}>
  <div style={{ display: 'flex' }}>
    

    <div style={{ flex: '70%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField label="Title" variant="outlined" fullWidth margin="normal" />
        <TextField label="Description" variant="outlined" fullWidth margin="normal" />
        <TextField label="Website Name" variant="outlined" fullWidth margin="normal" />
        {/* Add other input fields here */}
      </div>
    </div>
  </div>

      {/* Contributors dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Contributors</InputLabel>
        <Select label="Contributors">
          <MenuItem value="contributor1">Contributor 1</MenuItem>
          <MenuItem value="contributor2">Contributor 2</MenuItem>
          {/* Add other contributors here */}
        </Select>
      </FormControl>

      {/* Add member button */}
      <B_Button variant="primary" color="primary">
        Add Member +
      </B_Button>

      {/* Publication date and access date */}
      <div style={{ display: 'flex' }}>
        <InputLabel style={{marginTop:'20px', marginRight:'15px'}}>Publication Date</InputLabel>
        {/* Year */}
        <TextField label="Year" variant="outlined" margin="normal" />
        {/* Month dropdown */}
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Month</InputLabel>
          <Select label="Month">
            <MenuItem value="jan">January</MenuItem>
            <MenuItem value="feb">February</MenuItem>
            <MenuItem value="mar">March</MenuItem>
            <MenuItem value="apr">April</MenuItem>
            <MenuItem value="may">May</MenuItem>
            <MenuItem value="jun">June</MenuItem>
            <MenuItem value="jul">July</MenuItem>
            <MenuItem value="aug">August</MenuItem>
            <MenuItem value="sep">September</MenuItem>
            <MenuItem value="oct">October</MenuItem>
            <MenuItem value="nov">November</MenuItem>
            <MenuItem value="dec">December</MenuItem>
          
            {/* Add other months here */}
          </Select>
        </FormControl>
        {/* Day */}
        <TextField label="Day" variant="outlined" margin="normal" />
      </div>


      <div style={{ display: 'flex' }}>
        <InputLabel style={{marginTop:'20px', marginRight:'15px'}}>Access Date</InputLabel>
        {/* Year */}
        <TextField label="Year" variant="outlined" margin="normal" />
        {/* Month dropdown */}
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Month</InputLabel>
          <Select label="Month">
            <MenuItem value="jan">January</MenuItem>
            <MenuItem value="feb">February</MenuItem>
            <MenuItem value="mar">March</MenuItem>
            <MenuItem value="apr">April</MenuItem>
            <MenuItem value="may">May</MenuItem>
            <MenuItem value="jun">June</MenuItem>
            <MenuItem value="jul">July</MenuItem>
            <MenuItem value="aug">August</MenuItem>
            <MenuItem value="sep">September</MenuItem>
            <MenuItem value="oct">October</MenuItem>
            <MenuItem value="nov">November</MenuItem>
            <MenuItem value="dec">December</MenuItem>
          
            {/* Add other months here */}
          </Select>
        </FormControl>
        {/* Day */}
        <TextField label="Day" variant="outlined" margin="normal" />
      </div>

       <div style={{ flex: '70%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
       <TextField label="URL" variant="outlined" fullWidth margin="normal" />
      
      </div>
    </div>

      <Button type="submit" variant="contained" color="primary" fullWidth onClick={modalhandleClose}>
        Save Citation
      </Button>
    </form>
  </div>
</Modal>


{/* 
//////////////////////////////////////MODAL//////////////////////////////////////////////////////////////////////// */}

  </Col>
</Row>

      </Container>


      <Container style={{marginTop:"10px"}}>
        <h3>Citations</h3>
      </Container>

      <Container style={{ marginTop: "10px" }}>
  <Row xs={12} className="justify-content-between">
    <FormControl>
      <FormControlLabel control={<Checkbox />} label="Source" />
    </FormControl>

    <div className="d-flex align-items-center ml-auto"> {/* This div pushes its contents to the right */}
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{
          width: '171.19px',
          height: '42.02px',
          backgroundColor: '#FFFFFF',
          marginLeft: '10px',  // Adjust as needed
        }}
      />

      <NativeSelect
        defaultValue=""
        fullWidth
        style={{
          paddingLeft: '3px',
          width: '175px',
          height: '42.02px',
          backgroundColor: '#FFFFFF',
          marginLeft: '10px',  // Adjust as needed
        }}
      >
        <option value="AMA 10th edition">AMA 10th edition</option>
        <option value="American Chemical Society">American Chemical Society</option>
        <option value="APA 11th edition">APA 11th edition</option>
        <option value="APA 6th edition">APA 6th edition</option>
        <option value="APA 7th edition">APA 7th edition</option>
        <option value="Chicago author">Chicago author</option>
      </NativeSelect>
    

      <CopyIcon style={{ width: '24px', height: '24px', marginLeft: '10px', marginTop: '7px' }} />
      <DownloadIcon style={{ width: '24px', height: '24px', marginLeft: '10px', marginTop: '7px' }} />
      <SortByAlphaIcon style={{ width: '24px', height: '24px', marginLeft: '10px', marginTop: '7px' }} />
    </div>
  </Row>
</Container>

<Container style={{ marginTop: '15px' }}>
      {citations.map((citation, index) => (
        <div
          key={index}
          style={{
            position: 'relative',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '10px',
            boxShadow: '3px 1px 8px 0px rgba(0,0,0,0.25)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Checkbox */}
          <Checkbox style={{ position: 'absolute', top: '10px', left: '10px' }} />

          {/* Citation content */}
          <div style={{ marginLeft: '50px' }}>
            <h3>{citation.JournalArticle.articleTitle}</h3>
            <p>{citation.JournalArticle.fullCitation}</p>
            <p>{citation.JournalArticle.inTextCitation}</p>
          </div>

          {/* Menu Icon */}
          <IconButton
            style={{ position: 'absolute', top: '10px', right: '10px' }}
        
          >
            <MoreVertIcon />
          </IconButton>

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
          
          >
          
          </Menu>
        </div>
      ))}
    </Container>
    </div>
    </>
  );
};

export default Citation1;
