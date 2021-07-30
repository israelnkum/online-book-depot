import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Typography, List, Spin} from "antd"
import {useDispatch} from "react-redux"
import {getLandingCategories} from "../../../actions/categories/CategoryAction"
import {Link} from "react-router-dom"
export default function OtherCategories(props) {
    const [loadCategories, setLoadCategories] = useState(true)
    const state = store.getState()
    const {categories} = state.categoryReducer
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLandingCategories()).then(() => {
            setLoadCategories(false)
        })
    },[])
    return (
        <Card title={
            <Typography.Text>Other Categories</Typography.Text>
        } style={{ marginBottom: 10 }}>
            <Spin spinning={loadCategories} tip={'Loading...'}>
                <List>
                    {
                        categories
                            .sort()
                            .filter((cat) => cat.name !== props.name)
                            .map((category) => (
                                <Link  key={category.id} to={`/landing/category/${category.name}/${category.id}`}>
                                    <List.Item>
                                        <Typography.Text>{category.name}</Typography.Text>
                                        <div>{category.items}</div>
                                    </List.Item>
                                </Link>
                            ))
                    }
                </List>
            </Spin>
        </Card>
    )
}

OtherCategories.propTypes = {
    name: PropTypes.string.isRequired
}
