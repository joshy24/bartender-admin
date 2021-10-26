
//Our Auth Service
import AuthHelperMethods from '../auth/AuthHelperMethods';

const Auth = new AuthHelperMethods();

const Axios = Auth.axios;

const drinksUrl = '/drinks'
const createDrinkUrl = '/drinks/create'
const deleteDrinkUrl = '/drinks/delete'
const editDrinkUrl = '/drinks/edit'
const countDrinksUrl = '/drinks/count'

const categoriesUrl = '/categories'
const createCategoryUrl = '/categories/create'
const deleteCategoryUrl = '/categories/delete'
const editCategoryUrl = '/categories/edit'
const countCategoriesUrl = '/categories/count'

const agentsUrl = '/agents'
const createAgentUrl = '/agents/create'
const deleteAgentUrl = '/agents/delete'
const editAgentUrl = '/agents/edit'
const countAgentsUrl = '/agents/count'

const ordersUrl = '/orders'
const ordersCompletedUrl = '/orders/completed'
const ordersPendingUrl = '/orders/pending'
const ordersCountUrl = '/orders/count'
const ordersAssignAgentUrl = '/orders/assign_agent'
const ordersRemoveAgentUrl = '/orders/remove_agent'
const orderStatsUrl = '/orders/stats'
const orderFulfillUrl = '/orders/fulfill'

const uploadAgentIdUrl = '/uploads/agentid';
const uploadAgentAvatarUrl = '/uploads/agentavatar';
const uploadDrinkImageUrl='/uploads/drinkimage'; 

const financialsUrl = "/financials";
const monthlyFinancialsUrl = "/financials/monthly";

const promocodeUrl = "/promocodes"
const promocodeUrlGenerate = "/promocodes/generate"
const promocodeUrlEdit = "/promocodes/edit"
const promocodeUrlDelete = "/promocodes/delete"
const promocodeUrlDeactivate = "/promocodes/deactivate"
const promocodesCountUrl = "/promocodes/count"

const usersUrl = "/users";
const countUsersUrl = '/users/count'

export const getAgents = () => {
    return  Axios(agentsUrl)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log({err});
                    return "error";
                })
}

export const createAgent = (data) => {
    return Axios(createAgentUrl, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const editAgent = (data) => {
    return Axios(editAgentUrl, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const deleteAgent = (id) => {
    return Axios(deleteAgentUrl, {id})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const countAgents = () => {
    return Axios(countAgentsUrl)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const getOrders = (count, city) => {
    return  Axios(ordersUrl, {count, city})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const getCompletedOrders = (count, city) => {
    return  Axios(ordersCompletedUrl, {count, city})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const getPendingOrders = (count, city) => {
    return  Axios(ordersPendingUrl, {count, city})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const assignAgentToOrder = (agent_id, order_id) => {
    return  Axios(ordersAssignAgentUrl, {agent_id, order_id})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const removeAgentFromOrder = (agent_id, order_id) => {
    return  Axios(ordersRemoveAgentUrl, {agent_id, order_id})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const getOrdersCount = (city) => {
    return  Axios(ordersCountUrl, {city})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const getOrdersStats = (city) => {
    return  Axios(orderStatsUrl, {city})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const fulfillOrder = (id) => {
    return  Axios(orderFulfillUrl, {id})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const getDrinks = (city) => {
    return  Axios(drinksUrl, {city: city})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const createDrink = (data) => {
    return Axios(createDrinkUrl, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const editDrink = (data) => {
    return Axios(editDrinkUrl, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const deleteDrink = (id) => {
    return Axios(deleteDrinkUrl, {id})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const countDrinks = (city) => {
    return Axios(countDrinksUrl, {city})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const getCategories = (city) => {
    return Axios(categoriesUrl, {city})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const createCategory = (name, city) => {
    return Axios(createCategoryUrl, {name, city})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const editCategory = (id,name, city) => {
    return Axios(editCategoryUrl, {id,name, city})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const countCategories = () => {
    return Axios(countCategoriesUrl)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const uploadDrinkImage = (file) => {
    return Axios(uploadDrinkImageUrl, file)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const uploadAgentAvatar = (file) => {
    return Axios(uploadAgentAvatarUrl, file)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const uploadAgentId = (file) => {
    return Axios(uploadAgentIdUrl, file)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const getFinancials = (city) => {
    return Axios(financialsUrl, {city: city})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const getMonthlyFinancials = (city) => {
    return Axios(monthlyFinancialsUrl, {city: city})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const getPromocodes = (count, city) => {
    return Axios(promocodeUrl, {count, city})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const generatePromocodes = (name, usages, percentage, city) => {
    return Axios(promocodeUrlGenerate, {name, usages, percentage, city})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const editPromocode = (id, name, usages, percentage, city) => {
    return Axios(promocodeUrlEdit, {id, name, usages, percentage, city})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const deletePromocode = (id) => {
    return Axios(promocodeUrlDelete, {id})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const deactivatePromocode = (id) => {
    return Axios(promocodeUrlDeactivate, {id})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}

export const getPromocodesCount = () => {
    return  Axios(promocodesCountUrl)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}



//Users
export const getUsers = (count) => {
    return  Axios(usersUrl, {count})
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return "error";
                })
}

export const countUsers = () => {
    return Axios(countUsersUrl)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                return "error";
            })
}