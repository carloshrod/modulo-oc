"use client";
import CustomHeader from "@/components/Header";
import styles from "./PurchaseOrder.module.css";
import { Layout } from "antd";
import Datatable from "@/components/Datatable";
import Toolbar from "@/components/Toolbar";

const { Content } = Layout;

const PurchaseOrder = () => {
  return (
    <Layout>
      <CustomHeader />
      <Content style={{ padding: "8px 16px" }}>
        <Toolbar />
        <div className={styles.TableContainer}>
          <Datatable />
        </div>
      </Content>
    </Layout>
  );
};

export default PurchaseOrder;
