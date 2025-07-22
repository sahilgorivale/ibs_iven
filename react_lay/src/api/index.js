import axios from "axios";

const baseURL = "PO_RFQ_TENDER/odata/v4/po-rfq-tender";

const instance = axios.create({
  baseURL
});

export const getTableData = async (params = { $top: 100, $skip: 0 }) => {
  const { data } = await instance.get("/tender_creation", {
    params
  });

  return data.d?.results || data.d || data.value;
};

export const getTableCount = async () => {
  const { data } = await instance.get("/tender_creation/$count");
  return data;
};
