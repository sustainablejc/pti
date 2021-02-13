import { useState } from 'react';
import axios from 'axios';

import { Button, Form, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { Material, MaterialHeader } from '../common/Materials';
import { Formik, FieldArray } from 'formik';


export function SubmitWeeklyAssessment() {

    const [redirect, setRedirect] = useState(false);
    const [materials, setMaterials] = useState([]);

    const handleSubmit = (data) => {
        console.log(data);
        /*
        axios.post(
            `http://localhost:8000/api/v1/weekly-assessment/`,
            {...data, 'user': 1, 'weeklyMaterials': materials}
            ).then(res => {
                setRedirect(true);
            }).catch(err => {
                debugger;
            });
        */
    };

    if (redirect) {
        return <Redirect to="/" />;
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
                    materials: [{'materialId': '', 'weight': ''}]
                }}
                onSubmit={handleSubmit}
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
                    handleReset
                } = props;

                return (
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
                                            values={values.materials} />
                                ))}
                            </div>
                        )}
                    </FieldArray>
                    <Form.Group as={Row}>
                        <Form.Label column xs="3">I composted!</Form.Label>
                        <Col sm="1">
                            <Form.Control
                                type="checkbox"
                                name="didCompost"
                                value={values.didCompost}
                                onChange={handleChange} />
                        </Col>

                        <Form.Label column xs="3">I reused an item!</Form.Label>
                        <Col sm="1">
                            <Form.Control
                                type="checkbox"
                                name="didReuseItems"
                                value={values.didReuseItems}
                                onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    {!values.didCompost
                        ?  (<Form.Group as={Row}>
                            <Form.Label column xs="3">I did not compost because ...</Form.Label>
                            <Col sm="5">
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
                            <Form.Label column xs="3">I reused ...</Form.Label>
                            <Col xs="5">
                                <Form.Control
                                    as="textarea"
                                    name="reusedItems"
                                    value={values.reusedItems}
                                    onChange={handleChange} />
                            </Col>
                        </Form.Group>)
                        : ''}
                    <Form.Group as={Row}>
                        <Form.Label column xs="3">This week I learned ...</Form.Label>
                        <Col xs="5">
                            <Form.Control
                                as="textarea"
                                name="learnedThisWeek"
                                value={values.learnedThisWeek}
                                onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column xs="3">I would like to add ...</Form.Label>
                        <Col xs="5">
                            <Form.Control
                                as="textarea"
                                name="comments"
                                value={values.comments}
                                onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <div className="mr-auto">
                        <Button type="submit" variant="secondary" onClick={handleSubmit}>Submit</Button>{' '}
                        <Button type="submit" variant="danger">Cancel</Button>
                    </div>
                </Form>);
            }}
            </Formik>
        </div>
    </>);
}

