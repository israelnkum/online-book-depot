import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'
import Main from "./main";
import Analytics from "./analytics";
import Shop from "../shop";
import TagsAndCategories from "../tag-and-categories";
import Items from "../items";

export default function Dashboard() {
    return (
        <Main>
            <Switch>
                <Route path={'/home'} exact>
                    <Analytics/>
                </Route>
                <Route path={'/shops'} exact>
                    <Shop/>
                </Route>
                <Route path={'/tag-categories'} exact>
                    <TagsAndCategories/>
                </Route>
                <Route path={'/items'} exact>
                    <Items/>
                </Route>
            </Switch>
        </Main>
    );
}

