import React from 'react';
import './customLoader.css'
import { Oval, Triangle, Vortex } from 'react-loader-spinner';

const CustomLoader = ({ loading }) => {
    return (
        loading &&
        <div>
            <div id="loader-myModal" className="loader-modal">
                <div className="loader-modal-content">
                    <Vortex
                        height={250}
                        width={250}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}                     
                         colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    />
                </div>

            </div>
        </div>
    )
}

export default CustomLoader
