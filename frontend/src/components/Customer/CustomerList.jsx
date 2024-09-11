import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import PageTitleBox from '../common/PageTitleBox';
import AppLoader from '../common/AppLoader';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { DeleteRequest, PostRequest } from '../services/api';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiMiniPencilSquare } from "react-icons/hi2";
import useToast from '../controllers/useToast';
import { Paginate } from '../common/Pagenate';

function CustomersList() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useToast()

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await PostRequest(`${API_ENDPOINTS.customers.GetAll}?page=${currentPage}&limit=10`);
      if (response.status === 200) {
        setList(response?.data);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await DeleteRequest(`${API_ENDPOINTS.customers.Delete}/${id}`);
      if (response.status === 200) {
        showToast("success", response.data?.message);
        fetchCustomers()
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };
  console.log(list ,"list")

  useEffect(() => {
    fetchCustomers()
  }, [currentPage])
  return (
    <Container >
      <PageTitleBox
        title="Customers"
        name="Customers"
        pageTitle="Customers List"
        rightItem={
          <Row className="justify-content-end">
            <Button onClick={() => navigate('/customer')}>
              <GoPlus /> Add
            </Button>
          </Row>
        }
      />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: 'calc(100vh - 200px)' }}
        >
          <AppLoader variant="primary" />
        </div>
      ) : (
        <Card className="border-0 p-3 shadow-sm">
          <div className="table-responsive overflow-auto">
            <Table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Subscription Type</th>
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.customers?.map((item, index) => (
                    <tr key={index} className="hand" >
                      <td>{item?.firstName}</td>
                      <td>{item?.lastName}</td>
                      <td>{item?.email}</td>
                      <td>{item?.contactNumber}</td>
                      <td>{item?.membershipId ? item?.membershipId?.membershipType : 'NA'}</td>
                      <td>
                        {/* <span>{item?.status} */}
                        <div className='d-flex gap-2'>
                          <FaRegTrashAlt
                            className="text-danger"
                            onClick={() => handleDelete(item?._id)}
                            role="button"

                          />
                          <HiMiniPencilSquare
                            className="text-danger"
                            onClick={() => navigate(`/customer/${item?._id}`)}
                            role="button"
                          />

                        </div>

                        {/* </span> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
            <div className=" d-flex justify-content-end ">
              <Paginate
                 handlePageClick={handlePageClick}
                 pageCount={totalPages}
                 pageNo={currentPage}
              />
              </div>
        </Card>
      )}
    </Container>
  )
}

export default CustomersList