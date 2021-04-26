import { useState } from 'react';
import axios from 'axios';

import { Alert, Button, Form, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useAuthState } from '../Context';

import { Material, MaterialHeader } from '../common/Materials';
import { Formik, FieldArray } from 'formik';


export function SubmitWeeklyAssessment() {

    const [redirect, setRedirect] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [showAlert, setShowAlert] = useState();

    const {user, token} = useAuthState();

    const handleSubmit = (data, {resetForm, setErrors, setStatus}) => {
        const formattedData = {
            ...data,
            weeklyMaterials: data.materials.map(x => {
                const isWeight = x.weight != "";
                const amount = isWeight
                    ? x.weight
                    : x.quantity;
                const units = isWeight
                    ? "lbs"
                    : "quantity";
                return {
                    materialId: x.materialId,
                    amount: amount,
                    units: units
                };
            }),
        }
        axios.post(
            'http://localhost:8000/api/v1/weekly-assessment/',
            formattedData, {
                headers: {'Authorization': 'Token ' + token}
            }).then(res => {
                resetForm({});
                setStatus({success: true});
                setShowAlert(true);
                //setRedirect(true);
            }).catch(err => {
                setStatus({success: false});
                setErrors({submit: "There was a problem submitting your assessment"});
                setShowAlert(true);
            });
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

    const validate = (values) => {
        const errors = {};

        values.materials.forEach((x, index) => {
            const name = `materials.${index}`;
            if (x.materialId == "") {
                errors[name] = "please select a material";
                return;
            }

            if (x.weight == "" && x.quantity == "") {
                errors[name] = "please add a weight or quantity";
                return;
            }

            if (x.weight != "" && x.quantity != "") {
                errors[name] = "please add either a weight or quantity";
                return;
            }

            if (x.weight != "" && x.weight <= 0) {
                errors[name] = "weight cannot be negative";
                return;
            }

            if (x.quantity != "" && x.quantity <= 0) {
                errors[name] = "quantity cannot be negative";
                return;
            }
        });

        return errors;
    }

    return (
        <>
        <h3 className="header-block">TRACK YOUR TRASH</h3>
        <div className="container">
            <Formik
                initialValues={{
                    didCompost: false,
                    compostReason: '',
                    didReuseItems: false,
                    reusedItems: '',
                    learnedThisWeek: '',
                    comments: '',
                    materials: [{'materialId': '', 'weight': '', 'quantity': ''}]
                }}
                onSubmit={handleSubmit}
                validate={validate}
            >
            {props => {

                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                    resetForm,
                    status
                } = props;

                return (
                <>
                    {!!status && !!status.success && showAlert
                        ? (<Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                            <Alert.Heading>Successfully Created Assessment</Alert.Heading>
                        </Alert>)
                        : ''
                    }
                    {!!status && !!status.success == false && showAlert
                        ? (<Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                            <Alert.Heading>Successfully Created Assessment</Alert.Heading>
                        </Alert>)
                        : ''
                    }
                <Form onSubmit={handleSubmit}>
                    <FieldArray name="materials">
                        {({insert, remove, push}) => (
                            <div>
                                <MaterialHeader />
                                {values.materials.length > 0 &&
                                    values.materials.map((material, index) => (
                                        <Material
                                            key={index}
                                            index={index}
                                            handleChange={handleChange}
                                            name={`materials.${index}`}
                                            remove={remove}
                                            isLast={index == values.materials.length - 1}
                                            add={() => push(
                                                {'materialId': '', 'weight': '', 'quantity': ''}
                                            )}
                                            error={errors[`materials.${index}`]}
                                            dirty={dirty}
                                            values={values.materials} />
                                ))}
                            </div>
                        )}
                    </FieldArray>
                    <Form.Group as={Row}>
                        <Col sm="7" md="3">
                            <Form.Switch
                                label="I composted!"
                                id="compostSwitch"
                                type="checkbox"
                                name="didCompost"
                                checked={values.didCompost}
                                onChange={handleChange} />
                        </Col>
                        <Col sm="7" md="3">
                            <Form.Switch
                                label="I reused an item!"
                                id="reuseSwitch"
                                type="checkbox"
                                name="didReuseItems"
                                checked={values.didReuseItems}
                                onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    {!values.didCompost
                        ?  (<Form.Group as={Row}>
                            <Form.Label column sm="7" md="3">I did not compost because ...</Form.Label>
                            <Col sm="7" md="5">
                                <Form.Control
                                    as="textarea"
                                    name="compostReason"
                                    value={values.compostReason}
                                    onChange={handleChange} />
                            </Col>
                        </Form.Group>)
                        : ''}
                    {values.didReuseItems
                        ? (<Form.Group as={Row}>
                            <Form.Label column sm="7" md="3">I reused ...</Form.Label>
                            <Col sm="7" md="5">
                                <Form.Control
                                    as="textarea"
                                    name="reusedItems"
                                    value={values.reusedItems}
                                    onChange={handleChange} />
                            </Col>
                        </Form.Group>)
                        : ''}
                    <Form.Group as={Row}>
                        <Form.Label column sm="7" md="3">This week I learned ...</Form.Label>
                        <Col sm="7" md="5">
                            <Form.Control
                                as="textarea"
                                name="learnedThisWeek"
                                value={values.learnedThisWeek}
                                onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="7" md="3">I would like to add ...</Form.Label>
                        <Col sm="7" md="5">
                            <Form.Control
                                as="textarea"
                                name="comments"
                                value={values.comments}
                                onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <div className="mr-auto">
                        <Button
                            disabled={
                                !dirty
                             || Object.keys(errors).length != 0
                             || token == null
                             || token == ""}
                            type="submit"
                            variant="secondary"
                            onClick={handleSubmit}>Submit</Button>{' '}
                    </div>
                </Form>
            </>);
            }}
            </Formik>
        </div>
    </>);
}

