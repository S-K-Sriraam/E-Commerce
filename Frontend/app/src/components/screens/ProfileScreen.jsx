import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import Loader from '../Loader'
import Message from '../Message'

import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from '../../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'

function ProfileScreen() {
    // ---------------- LOCAL STATE ----------------
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ---------------- REDUX STATE ----------------
    const { userInfo } = useSelector(state => state.userLogin || {})

    const {
        loading: loadingUser,
        error: errorUser,
        user,
    } = useSelector(state => state.userDetails || {})

    const {
        loading: loadingOrders,
        error: errorOrders,
        orders = [],
    } = useSelector(state => state.orderMyList || {})

    const { success } = useSelector(state => state.userUpdateProfile || {})

    // ---------------- FETCH USER + ORDERS ----------------
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(getUserDetails(userInfo._id))
            dispatch(listMyOrders())
        }
    }, [dispatch, navigate, userInfo])

    // ---------------- SET FORM DATA ----------------
    useEffect(() => {
        if (user) {
            setFname(user.fname || '')
            setLname(user.lname || '')
        }
    }, [user])

    // ---------------- AFTER PROFILE UPDATE ----------------
    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails(userInfo._id))
            dispatch(listMyOrders())
        }
    }, [dispatch, success, userInfo])

    // ---------------- SUBMIT ----------------
    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
            return
        }

        dispatch(updateUserProfile({
            id: user._id,
            fname,
            lname,
            password,
        }))
    }

    // ---------------- DATE FORMAT ----------------
    const formatDate = (date) => {
        if (!date) return '—'
        return new Date(date).toISOString().substring(0, 10)
    }

    // ---------------- UI ----------------
    return (
        <Row>
            {/* ========== USER PROFILE ========== */}
            <Col md={3}>
                <h2>USER PROFILE</h2>

                {message && <Message variant="danger">{message}</Message>}
                {errorUser && <Message variant="danger">{errorUser}</Message>}
                {loadingUser && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" className="w-100">
                        UPDATE
                    </Button>
                </Form>
            </Col>

            {/* ========== MY ORDERS ========== */}
            <Col md={9}>
                <h2>MY ORDERS</h2>

                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : orders.length === 0 ? (
                    <Message>No orders placed yet</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{formatDate(order.createdAt || order.created_at)}</td>
                                    <td>Rs {order.totalPrice}</td>

                                    <td>
                                        {order.isPaid ? (
                                            formatDate(order.paidAt || order.paid_at)
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }} />
                                        )}
                                    </td>

                                    <td>
                                        {order.isDelivered ? (
                                            <i className="fas fa-check" style={{ color: 'green' }} />
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }} />
                                        )}
                                    </td>

                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm">DETAILS</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen