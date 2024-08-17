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
    public partial class Form56 : Form
    {
        public Form56()
        {
            InitializeComponent();
        }

        private void Form56_Load(object sender, EventArgs e)
        {
            label1.Text = "Giới tính";
            radioButton1.Text = "Nam";
            radioButton2.Text = "Nữ";
        }

        private void radioButton1_CheckedChanged(object sender, EventArgs e)
        {
            if (this.radioButton1.Checked)
                MessageBox.Show($"Giới tính bạn là: {radioButton1.Text}");
        } 


        private void radioButton2_CheckedChanged_1(object sender, EventArgs e)
        {
            if (this.radioButton2.Checked)
                MessageBox.Show($"Giới tính bạn là: {radioButton2.Text}");
        }
    }
}
