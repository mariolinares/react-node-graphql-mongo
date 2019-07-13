import React from 'react';

import { message } from 'antd';

const Exito = ({mensaje}) => {
    return (message.success(mensaje));
};

export default Exito;