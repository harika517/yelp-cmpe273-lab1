import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import { GET_ORDERS, ORDERS_ERROR } from './types';