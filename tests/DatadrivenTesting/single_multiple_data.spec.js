import {test} from "@playwright/test"
import single_multiple_data from "../../testdata/single_multiple_data.json"
test ("read Single data",async({page})=>
{
    //! single data
    console.log(single_multiple_data.name);
})

test("read Multiple data",async({page})=>
{
    //! Multiple Data
    for (let data of single_multiple_data)
    {
        console.log(data.age)
    }
})

