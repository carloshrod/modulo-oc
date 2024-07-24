"use client";
import CustomHeader from "@/components/Header";
import Link from "next/link";
import styles from "./PurchaseOrder.module.css";
import { BiArrowBack } from "react-icons/bi";
import { IoDownloadOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { Button, Layout } from "antd";
import Datatable from "@/components/Datatable";

const { Content } = Layout;

const PurchaseOrder = () => {
  return (
    <Layout>
      <CustomHeader />
      <Content style={{ padding: "8px 16px" }}>
        <section className={styles.Toolbar}>
          <Link href="/" className={styles.GoBack}>
            <span>
              <BiArrowBack /> Volver a todas las Obras
            </span>
          </Link>
          <div className={styles.ActionButtons}>
            <Button
              type="primary"
              ghost
              icon={<IoDownloadOutline size={20} />}
              iconPosition="end"
            >
              Descargar Excel
            </Button>
            <Button type="primary" icon={<IoAdd size={24} />}>
              Generar OC
            </Button>
          </div>
        </section>
        <div className={styles.TableContainer}>
          <Datatable />
        </div>
      </Content>
    </Layout>
  );
};

export default PurchaseOrder;
