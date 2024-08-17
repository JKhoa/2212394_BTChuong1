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
    public partial class Form57 : Form
    {
        public Form57()
        {
            InitializeComponent();
        }

        private void Form57_Load(object sender, EventArgs e)
        {
            button1.Text = "Button";
            button2.Text = "Button Flat";
            checkBox1.Text = "Thay đổi màu chữ";
            checkBox2.Text = "Thay đổi màu nền";
            radioButton1.Text = "Kiểu Flat";
            radioButton2.Text = "Kiểu Popup";
        }

        private void button1_Click(object sender, EventArgs e)
        {
           
        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            if (this.checkBox1.Checked)
                this.button1.ForeColor = Color.Red;
            else
                this.button1.ForeColor = Color.Black;
        }

        private void checkBox2_CheckedChanged(object sender, EventArgs e)
        {
            if (this.checkBox2.Checked)
                this.button1.BackColor = Color.LightCyan;
            else
                this.button1.BackColor = this.button2.BackColor;
        }

        private void radioButton1_CheckedChanged(object sender, EventArgs e)
        {
            if(this.radioButton1.Checked)  
                this.button2.FlatStyle = FlatStyle.Flat;
            else
                this.button2.FlatStyle = FlatStyle.Popup;
        }
    }
}
