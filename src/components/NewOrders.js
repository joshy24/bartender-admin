import React, { useState, useEffect } from 'react';

import Order from '../subcomponents/Order';

import OrderItems from '../subcomponents/OrderItems';
import AssignAgent from '../subcomponents/AssignAgent';
import Loader from '../subcomponents/Loader';
import ViewAgent  from '../subcomponents/ViewAgent'
import ConfirmAction from "../subcomponents/ConfirmAction";
import OrderStatus from "../subcomponents/OrderStatus";

import { BottomScrollListener } from 'react-bottom-scroll-listener'

import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

import * as API from '../api/Api';

const left = {
    float: "left"
}

const right = {
    float: "right",
    marginTop: "-0.01px"
}

const btn_style = {
    marginLeft: "8px",
    marginRight: "8px",
    width: "120px"
}

const btn_grey = {
    background: "#797d7f",
    marginLeft: "8px",
    marginRight: "8px",
    width: "120px"
}

const btn_blue = {
    background: "#2E86C1",
    marginLeft: "8px",
    marginRight: "8px",
    width: "120px"
}

const title = "Confirm Order Fulfillment"
const message = "Please confirm that you want to mark this order as completed, this cant be undone."

const channels = ["neworder", "orderstatus", "routerequest"]

const pubnub = new PubNub({
    publishKey: 'pub-c-da5b31c8-45d5-4018-82be-843221a3b91c',
    subscribeKey: 'sub-c-de1f05de-af97-11e9-a732-8a2b99383297',
    uuid: 'Bartender247ng'
});

export default function Orders() {
    return (
      <PubNubProvider client={pubnub}>
        <OrdersContent />
      </PubNubProvider>
    );
}

function OrdersContent(){
    const [showConfirm, setShowConfirm] = useState(false)
   
    /*isLoading: true,
    total_count:0,
    orders: [],
    agents: [],
    showOrderStatus: false,
    orderStatusAgent: {},
    showOrderItems: false,
    showAgentsToAssign: false,
    showAgent: false,
    showInvoice: false,
    selected_order: {},
    selected_agent: {},
    order_type: "all"  */  

    return (
        <div>
            
        </div>
    )
}