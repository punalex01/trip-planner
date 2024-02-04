import { CHECKLIST_MODULE, FINANCIAL_MODULE } from 'src/global/constants';
import { Module } from 'src/interfaces/Module';

export const mockJapanModules: Module[] = [
  {
    name: 'Group Packing List',
    pageType: CHECKLIST_MODULE,
    uuid: '65b7629f-c24b-4694-adfa-ae8aff479098',
    id: 0,
  },
  {
    name: 'Financials',
    pageType: FINANCIAL_MODULE,
    uuid: '2bdbc10c-4d7f-467f-aed3-5f3a0e1f43b5',
    id: 1,
  },
];
