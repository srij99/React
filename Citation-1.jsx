import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button as B_Button,
} from "react-bootstrap";
import { Modal as B_Modal, Form } from "react-bootstrap";
import {
  InputAdornment,
  FormControlLabel,
  Select,
  Modal,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import {
  Link as MuiLink,
  MenuItem,
  Menu,
  Button,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  FileCopy as CopyIcon,
  GetApp as DownloadIcon,
} from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import citationService from "../../services/citationService";

const Citation1 = () => {
  const initialCitations = [
    {
      JournalArticle: {
        articleTitle: "Know Better Than Anyone",
        fullCitation:
          "G. (2023). Know better than anyone. Knowbetterthananyone",
        inTextCitation: "(G, 2023)",
      },
    },
    {
      JournalArticle: {
        articleTitle: "The Art of Knowledge",
        fullCitation:
          "Author B. (2023). The Art of Knowledge. Journal of Knowledge Studies",
        inTextCitation: "(Author B, 2023)",
      },
    },
  ];

  const [citations, setCitations] = useState(initialCitations);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [citationStyle, setCitationStyle] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [websiteData, setWebsiteData] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    heading: "",
    title: "",
    description: "",
    websiteName: "",
    contributors: "",
    url: "",
    publicationDate: {
      year: "",
      month: "",
      day: "",
    },
    accessDate: {
      year: "",
      month: "",
      day: "",
    },
  });

  //////////////////////////////////////////////     SORTING       &&&&     SEARCHING                   ///////////////////////////////////////////////////////
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    // Filter citations based on the search term
    const filteredCitations = initialCitations.filter((citation) =>
      citation.JournalArticle.articleTitle.toLowerCase().includes(newSearchTerm)
    );

    // Update the state with the filtered citations or reset to initial data
    setCitations(newSearchTerm ? filteredCitations : initialCitations);
  };

  const handleSortClick = () => {
    // Toggle the sorting order
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    // Sort the citations based on the title
    const sortedCitations = [...citations].sort((a, b) => {
      const titleA = a.JournalArticle.articleTitle.toUpperCase();
      const titleB = b.JournalArticle.articleTitle.toUpperCase();

      if (newSortOrder === "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    // Update the state with the sorted citations
    setCitations(sortedCitations);
  };
  //////////////////////////////////////////////     SORTING       &&&&     SEARCHING                   ///////////////////////////////////////////////////////

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await citationService.getCitationDetails(); // Use your service function to fetch data
  //       if (response.status === 200) {
  //         setCitations(response.citationDetails);
  //       } else {
  //         console.error("Error fetching citation details:", response.message);
  //       }
  //     } catch (error) {
  //       console.error("Error calling backend API:", error.message);
  //     }
  //   };

  //   fetchData(); // Call the fetchData function when the component mounts
  // }, []);

  const handleCiteButtonClick = async () => {
    try {
      const response = await citationService.getCheckCitation(searchInput);

      console.log("Backend Response:", response);
    } catch (error) {
      console.error("Error calling backend API:", error.message);
    }

    const fetchedWebsiteData = {
      websiteName: "Sample Website",
      tagline: "Explore the World of Samples",
    };

    setWebsiteData(fetchedWebsiteData);
  };

  const handleSaveCitations = async () => {
    // Handle save logic here

    try {
      const response = await citationService.getAddCitation(formData);

      console.log("Backend Response:", response);
    } catch (error) {
      console.error("Error calling backend API:", error.message);
    }

    console.log("Citations Saved:", formData);
    handleClose();
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

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
      <div style={{ maxwidth: "1000px", minWidth: "1000px" }}>
        <Container fluid>
          <Row className="text-center py-3">
            <Col>
              <h3 className="citation-generator">Citation Generator</h3>
            </Col>
          </Row>

          <Row
            style={{
              width: "1044px",
              zIndex: 1000,
              height: "72.4px",
              top: "173px",
              left: "306px",
              borderRadius: "15px",
              border: "1px solid #9F9F9F",
              backgroundColor: "#FFFFFF",
              paddingTop: "9px",
              paddingLeft: "6px",
              paddingRight: "6px",
              boxShadow: "3px 1px 8px 0px rgba(0,0,0,0.25)",
              marginLeft: "auto", // Align to the right
              marginRight: "auto", // Align to the left
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
                  <option value="American Chemical Society">
                    American Chemical Society
                  </option>
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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </FormControl>
            </Col>

            <Col xs={1}>
              <B_Button
                style={{ marginTop: "10px" }}
                variant="primary"
                onClick={handleCiteButtonClick}
              >
                Cite
              </B_Button>
            </Col>

            {websiteData && (
              <Accordion style={{ width: "100%", zIndex: 1001 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{websiteData.websiteName}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ position: "relative" }}>
                  <Typography>{websiteData.tagline}</Typography>

                  {/* Save Icon */}
                  <IconButton
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "40px",
                    }}
                    onClick={handleSaveCitations}
                  >
                    <AssignmentTurnedInIcon />
                  </IconButton>

                  {/* Copy Icon */}
                  <IconButton
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                    }}
                    onClick={() => {
                      // Add logic for copying here
                    }}
                  >
                    <CopyIcon />
                  </IconButton>
                  <IconButton
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick={handleCloseAccordion}
                  >
                    <ExpandLessIcon />
                  </IconButton>
                </AccordionDetails>
              </Accordion>
            )}
          </Row>
        </Container>

        <Container fluid style={{ marginTop: "10px" }}>
          <Row xs={12} className="justify-content-between">
            <Col>
              <MuiLink
                style={{ marginLeft: "10px" }}
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
              <MyModal
                handleSaveCitations={() => handleSaveCitations()}
                formData={formData}
                setFormData={setFormData}
              />
            </Col>
          </Row>
        </Container>

        <Container style={{ marginTop: "10px" }}>
          <h3>Citations</h3>
        </Container>

        <Container style={{ marginTop: "10px" }}>
          <Row xs={12} className="justify-content-between">
            <FormControl>
              <FormControlLabel control={<Checkbox />} label="Source" />
            </FormControl>

            <div className="d-flex align-items-center ml-auto">
              {" "}
              {/* This div pushes its contents to the right */}
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
                  width: "171.19px",
                  height: "42.02px",
                  backgroundColor: "#FFFFFF",
                  marginLeft: "10px", // Adjust as needed
                }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <NativeSelect
                defaultValue=""
                fullWidth
                style={{
                  paddingLeft: "3px",
                  width: "175px",
                  height: "42.02px",
                  backgroundColor: "#FFFFFF",
                  marginLeft: "10px", // Adjust as needed
                }}
              >
                <option value="AMA 10th edition">AMA 10th edition</option>
                <option value="American Chemical Society">
                  American Chemical Society
                </option>
                <option value="APA 11th edition">APA 11th edition</option>
                <option value="APA 6th edition">APA 6th edition</option>
                <option value="APA 7th edition">APA 7th edition</option>
                <option value="Chicago author">Chicago author</option>
              </NativeSelect>
              <CopyIcon
                style={{
                  width: "24px",
                  height: "24px",
                  marginLeft: "10px",
                  marginTop: "7px",
                }}
              />
              <DownloadIcon
                style={{
                  width: "24px",
                  height: "24px",
                  marginLeft: "10px",
                  marginTop: "7px",
                }}
              />
              <SortByAlphaIcon
                style={{
                  width: "24px",
                  height: "24px",
                  marginLeft: "10px",
                  marginTop: "7px",
                }}
                onClick={handleSortClick}
              />
            </div>
          </Row>
        </Container>

        <Container style={{ marginTop: "15px" }}>
          {citations.map((citation, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                boxShadow: "3px 1px 8px 0px rgba(0,0,0,0.25)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Checkbox */}
              <Checkbox
                style={{ position: "absolute", top: "10px", left: "10px" }}
              />

              {/* Citation content */}
              <div style={{ marginLeft: "50px" }}>
                <h3>{citation.JournalArticle.articleTitle}</h3>
                <p>{citation.JournalArticle.fullCitation}</p>
                <p>{citation.JournalArticle.inTextCitation}</p>
              </div>

              {/* Menu Icon */}
              <IconButton
                style={{ position: "absolute", top: "10px", right: "10px" }}
              >
                <MoreVertIcon />
              </IconButton>

              {/* Menu */}
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
              ></Menu>
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};

const MyModal = ({ handleSaveCitations, formData, setFormData }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const contributors = ["Contributor 1", "Contributor 2"];
  const headings = ["Webpage", "Website", "Book", "Poem"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <a href="#" onClick={handleShow} style={{ whiteSpace: "nowrap" }}>
        Cite Manually
      </a>

      <B_Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ marginTop: "30px", maxHeight: "90vh", fontSize: "10px" }}
      >
        <B_Modal.Header closeButton>
          <B_Modal.Title>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {formData.heading || "Webpage"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {headings.map((item) => (
                  <Dropdown.Item
                    key={item}
                    onClick={() => handleInputChange("heading", item)}
                  >
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </B_Modal.Title>
        </B_Modal.Header>
        <B_Modal.Body>
          <Form>
            {/* Text Fields */}
            <Form.Group controlId="formTitle">
              <Form.Control
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Control
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </Form.Group>

            <Form.Group controlId="formWebsiteName">
              <Form.Control
                type="text"
                placeholder="Website Name"
                value={formData.websiteName}
                onChange={(e) =>
                  handleInputChange("websiteName", e.target.value)
                }
              />
            </Form.Group>

            {/* Contributors Dropdown */}
            <Form.Group controlId="formContributors">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {formData.contributors || "Contributors"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {contributors.map((item) => (
                    <Dropdown.Item
                      key={item}
                      onClick={() => handleInputChange("contributors", item)}
                    >
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            {/* Add Members Button */}
            <Button variant="primary" block>
              Add Members +
            </Button>

            {/* Publication Date */}
            <Form.Group controlId="formPublicationDate" className="row">
              <Form.Label className="col-md-3">Publication Date</Form.Label>
              <Form.Control
                className="col-md-3"
                type="number"
                placeholder="Year"
                value={formData.publicationDate.year}
                onChange={(e) =>
                  handleInputChange("publicationDate", {
                    ...formData.publicationDate,
                    year: e.target.value,
                  })
                }
              />
              <Form.Control
                className="col-md-3"
                as="select"
                placeholder="Month"
                value={formData.publicationDate.month}
                onChange={(e) =>
                  handleInputChange("publicationDate", {
                    ...formData.publicationDate,
                    month: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Month
                </option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </Form.Control>
              <Form.Control
                className="col-md-3"
                type="number"
                placeholder="Day"
                value={formData.publicationDate.day}
                min={1}
                max={31}
                onChange={(e) =>
                  handleInputChange("publicationDate", {
                    ...formData.publicationDate,
                    day: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* Access Date */}
            <Form.Group controlId="formAccessDate" className="row">
              <Form.Label className="col-md-3">Access Date</Form.Label>
              {/* Similar structure as Publication Date */}
              <Form.Control
                className="col-md-3"
                type="number"
                placeholder="Year"
                value={formData.accessDate.year}
                onChange={(e) =>
                  handleInputChange("accessDate", {
                    ...formData.accessDate,
                    year: e.target.value,
                  })
                }
              />
              <Form.Control
                className="col-md-3"
                as="select"
                placeholder="Month"
                value={formData.accessDate.month}
                onChange={(e) =>
                  handleInputChange("accessDate", {
                    ...formData.accessDate,
                    month: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Month
                </option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </Form.Control>
              <Form.Control
                className="col-md-3"
                type="number"
                placeholder="Day"
                value={formData.accessDate.day}
                min={1}
                max={31}
                onChange={(e) =>
                  handleInputChange("accessDate", {
                    ...formData.accessDate,
                    day: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* URL */}
            <Form.Group controlId="formURL">
              <Form.Control
                type="text"
                placeholder="URL"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
              />
            </Form.Group>
          </Form>
        </B_Modal.Body>
        <B_Modal.Footer>
          <Button variant="primary" onClick={handleSaveCitations}>
            Save Citations
          </Button>
        </B_Modal.Footer>
      </B_Modal>
    </>
  );
};

export default Citation1;
