import React, { useEffect, useState } from "react";
import { Table, Modal, Input, Button } from "antd";
import { getTableData, getTableCount } from "api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const PAGE_SIZE = 7;

const MasterPage = () => {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: PAGE_SIZE,
    total: 0,
  });
  const [formData, setFormData] = useState({
    tender_name: "",
    tender_opening_date: "",
    tendor_closing_date: "",
    tender_note: "",
  });

  const loadData = async (page, pageSize) => {
    setLoading(true);
    try {
      const [items, count] = await Promise.all([
        getTableData((page - 1) * pageSize, pageSize),
        getTableCount(),
      ]);

      const dataWithKey = items.map((item, index) => ({
        ...item,
        key: item.tender_no || index,
      }));

      setData(dataWithKey);
      setTotalRows(count);
      setPagination((prev) => ({
        ...prev,
        current: page,
        total: count,
      }));
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    loadData(pagination.current, pagination.pageSize);
  };

  const handleEdit = (record) => {
    setEditingItem({ ...record }); // Create a copy
    setFormData({
      tender_name: record.tender_name || "",
      tender_opening_date: record.tender_opening_date || "",
      tendor_closing_date: record.tendor_closing_date || "",
      tender_note: record.tender_note || "",
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your API or dispatch Redux action here
        console.log("Deleting:", record);
        Swal.fire("Deleted!", "The record has been deleted.", "success");
      }
    });
  };

  const handleOk = () => {
    setData((prev) =>
      prev.map((item) =>
        item.key === editingItem.key
          ? { ...item, ...formData }
          : item
      )
    );
    setIsModalVisible(false);
    setEditingItem(null);
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns = [
    {
      title: "Tender No",
      dataIndex: "tender_no",
      key: "tender_no",
      className: "text-center",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Tender Name",
      dataIndex: "tender_name",
      key: "tender_name",
      className: "text-center",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Tender Opening Date",
      dataIndex: "tender_opening_date",
      key: "tender_opening_date",
      className: "text-center",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Tender Closing Date",
      dataIndex: "tendor_closing_date",
      key: "tendor_closing_date",
      className: "text-center",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Tender Note",
      dataIndex: "tender_note",
      key: "tender_note",
      className: "text-center",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "text-center",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Action",
      key: "action",
      className: "text-center",
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <EditOutlined
            className="text-gray-700 cursor-pointer"
            onClick={() => handleEdit(record)}
          />

          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
  ];

  return (
    <>
      <Table
        className="text-center"
        columns={columns}
        dataSource={data}
        pagination={{ ...pagination, showSizeChanger: false }}
        loading={loading}
        onChange={handleTableChange}
      />

      <Modal
        title="Edit Tender"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="save"
            onClick={handleOk}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Save
          </Button>,
        ]}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tender Name</label>
          <input
            type="text"
            name="tender_name"
            value={formData.tender_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Tender Opening Date
          </label>
          <DatePicker
            name="tender_opening_date"
            value={
              formData.tender_opening_date
                ? dayjs(formData.tender_opening_date)
                : null
            }
            onChange={(date, dateString) =>
              setFormData({ ...formData, tender_opening_date: dateString })
            }
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Tender Closing Date
          </label>
          <DatePicker
  name="tendor_closing_date"
  value={formData.tendor_closing_date ? dayjs(formData.tendor_closing_date) : null}
  onChange={(date, dateString) =>
    setFormData({ ...formData, tendor_closing_date: dateString })
  }
  className="w-full border border-gray-300 rounded px-3 py-2"
/>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tender Note</label>
          <textarea
            name="tender_note"
            value={formData.tender_note}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </Modal>
    </>
  );
};

export default MasterPage;
