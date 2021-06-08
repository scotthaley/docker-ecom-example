import { home } from 'react-storefront-connector'
import {fetchNavBarTabs} from "../../lib/api";

export default async function(req, res) {
  const [tabs, h] = await Promise.all([fetchNavBarTabs() ,home(req, res)])

  res.json({
    ...h,
    appData: {
      ...h.appData,
      tabs
    }
  })
}
