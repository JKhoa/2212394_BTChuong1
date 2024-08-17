using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _2212394_BTChuong1
{
    public partial class Form48 : Form
    {
        public Form48()
        {
            InitializeComponent();
        }

        private void Form48_Load(object sender, EventArgs e)
        {
            label1.Text = "Chọn ngoại ngữ";
            string[] data = { "Tiếng Anh", "Tiếng Pháp", "Tiếng Nhật" };
            this.comboBox1.DataSource = data;
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            //string sld = this.comboBox1.GetItemText(this.comboBox1.SelectedItem);
           MessageBox.Show(this.comboBox1.SelectedItem.ToString());
        }
    }
}
