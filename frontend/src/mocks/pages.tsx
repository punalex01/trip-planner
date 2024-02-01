import { CHECKLIST_MODULE, FINANCIAL_MODULE } from 'src/global/constants';
import { Module } from 'src/interfaces/Module';

export const mockJapanModules: Module[] = [
  {
    name: 'Group Packing List',
    pageType: CHECKLIST_MODULE,
  },
  {
    name: 'Financials',
    pageType: FINANCIAL_MODULE,
  },
];
