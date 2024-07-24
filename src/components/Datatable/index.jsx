"use client";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Input, Space, Table, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbPencilMinus } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";

const data = [
  {
    key: "1",
    oc_number: "OC 331-1",
    oc_name: "Tornillos",
    provider_rut: "77.930.430-1",
    provider_name: "Empresa maquinaria",
    creation_date: "12/05/23",
    approval_date: "12/05/23",
    total: "$450.000",
    oc_status: "En revisión",
  },
  {
    key: "2",
    oc_number: "OC 331-1",
    oc_name: "Tornillos",
    provider_rut: "77.930.430-1",
    provider_name: "Empresa maquinaria",
    creation_date: "12/05/23",
    approval_date: "12/05/23",
    total: "$450.000",
    oc_status: "Aprobada",
  },
  {
    key: "3",
    oc_number: "OC 331-1",
    oc_name: "Tornillos",
    provider_rut: "77.930.430-1",
    provider_name: "Empresa maquinaria",
    creation_date: "12/05/23",
    approval_date: "12/05/23",
    total: "$450.000",
    oc_status: "Rechazada",
  },
  {
    key: "4",
    oc_number: "OC 331-1",
    oc_name: "Tornillos",
    provider_rut: "77.930.430-1",
    provider_name: "Empresa maquinaria",
    creation_date: "12/05/23",
    approval_date: "12/05/23",
    total: "$450.000",
    oc_status: "Borrador",
  },
  {
    key: "5",
    oc_number: "OC 331-1",
    oc_name: "Tornillos",
    provider_rut: "77.930.430-1",
    provider_name: "Empresa maquinaria",
    creation_date: "12/05/23",
    approval_date: "12/05/23",
    total: "$450.000",
    oc_status: "En revisión",
  },
];

const Datatable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
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
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "N° OC",
      dataIndex: "oc_number",
      key: "oc_number",
      width: 80,
    },
    {
      title: "NOMBRE OC",
      dataIndex: "oc_name",
      key: "oc_name",
      ...getColumnSearchProps("oc_name"),
      width: 120,
    },
    {
      title: "RUT PROVEEDOR",
      dataIndex: "provider_rut",
      key: "provider_rut",
      ...getColumnSearchProps("provider_rut"),
      width: 145,
    },
    {
      title: "NOMBRE PROVEEDOR",
      dataIndex: "provider_name",
      key: "provider_name",
      ...getColumnSearchProps("provider_name"),
      width: 175,
    },
    {
      title: "FECHA CREACIÓN",
      dataIndex: "creation_date",
      key: "creation_date",
      sorter: (a, b) => a.creation_date.length - b.creation_date.length,
      sortDirections: ["descend", "ascend"],
      width: 150,
    },
    {
      title: "FECHA APROBACIÓN",
      dataIndex: "approval_date",
      key: "approval_date",
      sorter: (a, b) => a.approval_date.length - b.approval_date.length,
      sortDirections: ["descend", "ascend"],
      width: 165,
    },
    {
      title: "MONTO TOTAL",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total.length - b.total.length,
      sortDirections: ["descend", "ascend"],
      width: 135,
    },
    {
      title: "ESTADO OC",
      dataIndex: "oc_status",
      key: "oc_status",
      filters: [
        {
          text: "En revisión",
          value: "En revisión",
        },
        {
          text: "Aprobada",
          value: "Aprobada",
        },
        {
          text: "Rechazada",
          value: "Rechazada",
        },
        {
          text: "Borrador",
          value: "Borrador",
        },
      ],
      onFilter: (value, record) => record.oc_status.indexOf(value) === 0,
      render: (value) => {
        const COLORS = {
          "En revisión": "processing",
          Aprobada: "success",
          Rechazada: "error",
          Borrador: "warning",
        };

        return <Badge status={COLORS[value]} text={value} />;
      },
      width: 120,
    },
    {
      title: "ACCIONES",
      key: "actions",
      className: "actions",
      render: (_, record) => {
        const notDisabled =
          record.oc_status === "Rechazada" || record.oc_status === "Borrador";

        return (
          <Space size="small">
            <Tooltip title="Ver OC">
              <Button
                type="text"
                icon={<IoDocumentTextOutline size={20} color="#0D6EFD" />}
              />
            </Tooltip>
            <Tooltip title={notDisabled ? "Editar OC" : ""}>
              <Button
                type="text"
                icon={
                  <TbPencilMinus
                    size={20}
                    color={notDisabled ? "#0D6EFD" : "#A0AEC0"}
                  />
                }
                disabled={!notDisabled}
              />
            </Tooltip>
            <Tooltip title={notDisabled ? "Eliminar OC" : ""}>
              <Button
                type="text"
                icon={
                  <AiOutlineDelete
                    size={20}
                    color={notDisabled ? "#E53535" : "#FCBABA"}
                  />
                }
                disabled={!notDisabled}
              />
            </Tooltip>
          </Space>
        );
      },
      width: 140,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
        total: 500,
      }}
      style={{ maxWidth: "100%", overflowX: "auto" }}
    />
  );
};

export default Datatable;
