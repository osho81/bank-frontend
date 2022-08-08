import React from 'react';
import TransactionAccountService from '../Services/TransactionAccountService';

function UpdateTrAccountComponent(props) {

    const navigate = useNavigate();
    const navigateBack = useNavigate();

    const { id } = useParams();

    const [accountNo, setAccountNo] = useState('');
    const [balance, setBalance] = useState('');
    const [customer, setCustomer] = useState('');

    // Id & Account number not allowed to be changed




    useEffect(() => { // Initial retrieval of customer details/values
        TransactionAccountService.getTrAccountById(id).then((response) => {
            setAccountNo(response.data.accountNo);
            setBalance(response.data.balance);
            setCustomer(response.data.customer);
        }).catch(error => {
            console.log(error);
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div>
            
        </div>
    );
}

export default UpdateTrAccountComponent;