"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Alert } from "antd";

import { URL } from "@/constants/constant";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import "./ant.css";

import {
  Button,
  Segmented,
  Space,
  Switch,
  Table,
  Typography,
  Input,
} from "antd";
import type { TableColumnsType } from "antd";
import { useAuth } from "@/app/context/AuthContext";
import { Popconfirm } from "antd";
import AddProduct from "../products/AddProduct";

interface DataType {
  id: React.Key;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  discount: number;
  quantity: number;
  unit: string;
}
type DataIndex = keyof DataType;

interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<
    { text: string; value: string }[]
  >([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setLoading] = useState(true);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${URL}categories`);
        if (!response) return;
        console.log(response);
        const formattedCategories = response.data.categories.map(
          (category: string) => ({
            text: category,
            value: category,
          })
        );

        setCategories(formattedCategories);
      } catch (e) {
        console.error(e);
      }
    }
    fetchCategories();
  }, []);

  const [products, setProducts] = useState<
    Array<{
      name: string;
      description: string;
      price: number;
      id: string;
      category: string;
      image: string;
      discount: number;
      quantity: number;
      unit: string;
    }>
  >([]);

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, backgroundColor: "blue" }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  async function handleDelete(id: React.Key) {
    try {
      const response = await axios.delete(`${URL}product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        toast.success(`${response.data.product.name} deleted succesfully`);
      } else {
        toast.error(`Deletion failed`);
        return;
      }

      setProducts(products.filter((p) => p.id != id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => b.price - a.price,
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",

      showSorterTooltip: { target: "full-header" },
      filterMode: "tree",

      filters: categories,

      onFilter: (value, record) =>
        record.category.indexOf(value as string) === 0,
    },
    { title: "Discount", dataIndex: "discount", key: "discount" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    {
      title: "Action",
      dataIndex: "",
      key: "y",
      render: (_: any, record: DataType) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete?"
          onConfirm={() => handleDelete(record.id)}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okButtonProps={{ style: { backgroundColor: "blue" } }}
        >
          <Button type="primary" ghost>
            Modify
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_: any, record: DataType) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete?"
          onConfirm={() => handleDelete(record.id)}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okButtonProps={{ style: { backgroundColor: "blue" } }}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${URL}product`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 w-full z-10 flex flex-col">
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl mb-6">
          Total Products: {products.length}
        </p>
        <AddProduct />
      </div>

      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.id !== "Not Expandable",
        }}
        loading={loading}
        bordered={true}
        dataSource={products}
        rowKey="id"
      />
    </div>
  );
};

export default ProductList;
