import React, { useEffect, useState } from 'react'
import {  Button, Card, Col, Container, Row } from 'react-bootstrap'
import PageTitleBox from '../common/PageTitleBox'
import { FaRegTrashAlt } from "react-icons/fa";
import InputCtrl from '../controllers/InputCtrl';
import { useForm } from 'react-hook-form';
import {  useNavigate, useParams } from 'react-router-dom';
import useToast from '../controllers/useToast';
import PhoneCtrl from '../controllers/PhoneCtrl';
import { useTranslation } from "react-i18next";
import SelectCtrl from '../controllers/SelectCtrl';
import { GetRequest, PostRequest } from '../services/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';


const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    status: "",
    membershipId: "",
};
function CustomerAdd() {
    const [progress, setProgress] = useState(false);
    const navigate = useNavigate()
    const { t } = useTranslation();
    const { showToast } = useToast()

    const [phoneValue, setPhoneFields] = useState({
        phoneNumber: "",
    });
    const [subscriptions, setSubscriptions] = useState([])
    const params = useParams()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm({
        mode: "onBlur",
        ...defaultValues
    });


    const onSubmit = async (data) => {
        setProgress(true);
        const payload = {
            id : params?.id  ?  params?.id : 0,
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data.email,
            contactNumber: data.contactNumber,
            status: data.status,
            membershipId: data.membershipId
        };
        try {
            setProgress(true);
            const response = await PostRequest(API_ENDPOINTS.customers.Save, { ...payload });
            setProgress(false);
            if (response?.status === 200) {
                showToast("success", response.data?.message);
                navigate(-1);
            } else {
                showToast("success", response.data?.message);
            }
        } catch (error) {
            console.log(error, "errr");
        } finally {
            setProgress(false);
        }
    };
    const GetDetails = async () => {
        setProgress(true);
        try {
            const response = await GetRequest(`${API_ENDPOINTS.customers.Get}/${params?.id}`);
            const data = response.data;
            setProgress(false);
            reset({
                id: data?.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                status: data.status,
                membershipId: data.membershipId,
                contactNumber:data?.contactNumber
            });
            // setPhoneFields({
            //     phoneNumber: data?.contactNumber,
            // });

        } catch (error) {
            console.log(error, "error");
        } finally {
            setProgress(false);
        }
    };
    // satus 
    const fetchSubscriptions = async () => {
        try {
          const response = await PostRequest(`${API_ENDPOINTS.members.GetAll}?pageNumber=1&pageSize=500`);
          setProgress(false)
          if (response.status === 200) {
      
            setSubscriptions(response?.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

    const showError = (_fieldName) => {
        const keyList = _fieldName.split(".");
        const [key1, key2] = keyList;
        let error;
        if (key1 && key2) {
            const errorObj = (errors)[key1];
            error = errorObj ? errorObj[key2] : null;
        } else if (key1) {
            error = (errors)[key1];
        }
        return error ? error.message || "Field is required" : null;
    };

    useEffect(() => {
        if (params?.id) {
            GetDetails()
        }
        fetchSubscriptions()
    }, [])

    return (
        <Container>
            <PageTitleBox
                title="Customer Details"
                name="Customer"
                pageTitle="Customer / Customer Details"
            />
            <Card className="border-0 p-3 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Row className="my-3">
                        <Col md={6}>
                            <div className="mb-3">
                                <InputCtrl
                                    control={control}
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder={'First Name'}
                                    label={"First Name"}
                                    showError={showError}
                                    required={true}
                                    disabled={progress}
                                    className="mb-3 inputChange"
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <InputCtrl
                                    control={control}
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder={'Last Name'}
                                    label={"Last Name"}
                                    showError={showError}
                                    required={true}
                                    disabled={progress}
                                    className="mb-3 inputChange"
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <InputCtrl
                                    control={control}
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder={'Email'}
                                    label={"Email"}
                                    showError={showError}
                                    required={true}
                                    disabled={progress}
                                    className="mb-3 inputChange"
                                    componentName="Email"
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <PhoneCtrl
                                    control={control}
                                    name="contactNumber"
                                    id={"contactNumber"}
                                    placeholder={t("Enter_Phone")}
                                    label={"Contact Number"}
                                    showError={showError}
                                    required={getValues("contactNumber") ? false : true}
                                    disabled={progress}
                                    className="w-100 custom-field"
                                    defaultValue={getValues("contactNumber")}
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <SelectCtrl
                                control={control}
                                name="status"
                                id="status"
                                placeholder={"Select"}
                                label={"Subscription Plan"}
                                required={false}
                                disabled={progress}
                                className="mb-3 w-100"
                                options={
                                    [
                                      {
                                        label: "Gold",
                                        value: "GOLD"
                                      },
                                      {
                                        label: "Diamond",
                                        value: "DIAMOND"
                                      }
                                    ]
                                  }
                                showError={showError}
                            />
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <SelectCtrl
                                control={control}
                                name="membershipId"
                                id="membershipId"
                                placeholder={"Select"}
                                label={"Membership Plan"}
                                required={false}
                                disabled={progress}
                                className="mb-3 w-100"
                                options={subscriptions?.map((item) => {
                                    return {
                                        label: item?.membershipType,
                                        value: item?._id
                                    }
                                })}
                                showError={showError}
                            />
                            </div>
                        </Col>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex gap-3">
                                <Button className="btn-light" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                                <Button className="save-btn" type="submit">Save</Button>
                            </div>
                            <div>
                                <FaRegTrashAlt
                                    className="text-danger"
                                    // onClick={handleShow}
                                    role="button"
                                />
                            </div>
                        </div>
                    </Row>
                </form>
            </Card>
        </Container>
    )
}

export default CustomerAdd