import "./styles.css";
import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Container from "@mui/material/Container";
import axios from "axios";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Modal from "@mui/material/Modal";

const style = {
  height: '80vh',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function Main() {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState([]);
  const handleOpen = (e) => {
    setShowPreview(e);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setShowPreview([]);
  };

  const getData = async () => {
    const res = await axios.get(
      "https://www.azui.io:5000/api/v1/auth/getImages2"
    );
    console.log("res", res.data);
    if (res.data.success) {
      setData(res.data.data);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{ background: '#cbc2b6' }}>
        <div style={{ display: "flex", justifyContent: 'space-between', background: '#ffffff' }}>
          <span></span>
          <div className="header-icon">
            <img src="/masayuki.jpeg" alt="logo" width="150px" />
            <h4>A new way of living….</h4>
          </div>
          <span></span>
        </div>
        
        <Container >
          <div><video style={{"width:100%;max-height:100%"}} autoplay muted loop><source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" /></video></div>
          <Box sx={{ width: "auto", height: "auto" }}>
            <ImageList variant="masonry" cols={ window.innerWidth > 425 ? 3 : 2} gap={8}>
              {data &&
                data.map((item) => (
                  <ImageListItem key={item._id}>
                    {
                      item.images.length > 0 &&
                      <img
                        src={`https://www.azui.io:5000/uploads/${item.images[0]}`}
                        srcSet={`https://www.azui.io:5000/uploads/${item.images[0]}`}
                        alt={item.title}
                        loading="lazy"
                        onClick={() => handleOpen(item.images)}
                      />
                    }
                  </ImageListItem>
                ))}
            </ImageList>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Carousel dynamicHeight={true} style={{ height: '80vh' }}>
                {showPreview &&
                  showPreview.map((e, i) => (
                    <div key={i}>
                      <img
                        loading="lazy"
                        src={`https://www.azui.io:5000/uploads/${e}`}
                        alt={e}
                      />
                    </div>
                  ))}
              </Carousel>
            </Box>
          </Modal>
        </Container>
      </div>
      <footer style={{ background: '#000', color: '#fff' }}>
        <Box display="flex" flexWrap="wrap" alignItems="center" style={{ margin: '0 30px', justifyContent: 'space-between' }}>
          {/* <img src="/masayuki.jpeg" alt="logo" width="100px" /> */}
          <span></span>
          <div className="bottom-navigation">
            <div >
              <h4>CONTACT US</h4>
              <p>9909918718</p>
             {/* <p>9979681000</p> */}
              <p>masayuki.enterprise@gmail.com</p>
            </div>
            <div>
              <h4>Address</h4>
              <p>MASAYUKI</p>
              <p>BASMENT ROOM NO 3</p>
              <p>SAFAL SQUARE OPP PRIME SHOPER VESU </p>
              <p>SURAT GUJRAT</p>
              <p>India 395007</p>
            </div>
          </div>
          <span></span>
          {/* <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false} style={{ color: '#fff' }}>© 2023 Masayuki All rights reserved.</Typography> */}
        </Box>
      </footer>
    </>
  );
}
