import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Container } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from 'react-icons/io';
import { PostRequest } from '../services/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const CustomNavbar = () => {
  const [profilePicUrl, setProfilePicUrl] = useState<string>(() => {
    return sessionStorage.getItem('profilePicUrl') || "./dummy-user.jpg";
  });
  const fetchData = async () => {
    try {
      const response = await PostRequest(API_ENDPOINTS.user.me);
      if (response.status === 200) {
        setProfilePicUrl(response.data.fileUrl?response.data.fullFileUrl : "./dummy-user.jpg");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    const handleStorageChange = () => {
      const updatedProfilePicUrl = sessionStorage.getItem('profilePicUrl');
      if (updatedProfilePicUrl) {
        setProfilePicUrl(updatedProfilePicUrl);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  

  return (
    <Navbar bg="light" expand="md" sticky='top'>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="/images/lOGO.svg" className='img-fluid' alt="LOGO" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarSupportedContent" />

        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="m-auto mb-2 mb-lg-0"></Nav>
          <Form className="d-flex position-relative" role="search">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 position-relative rounded-4"
              style={{ paddingRight: '30px' }}
              aria-label="Search"
            />
            <span className="position-absolute end-0 top-50 translate-middle-y me-3">
              <CiSearch className='fs-4' />
            </span>
          </Form>
          <div className="position-relative" role='button'>
            <IoMdNotificationsOutline className='theme-color fs-4 position-relative' />
            <span className="position-absolute p-1 border border-light rounded-circle notification-indicator" style={{ background: 'var(--theme-color)' }}>
              <span className="visually-hidden">New alerts</span>
            </span>
          </div>
          <div className="mx-2">
            <div className="topbar-profile-image border-2 border d-flex align-items-center justify-content-center">
              <img src={profilePicUrl!=="http://st-ai-task-management-apis.npit.pro/"?profilePicUrl:"./dummy-user.jpg"} className='img-fluid rounded-circle border object-fit-cover' />
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
