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
    public partial class Form52 : Form
    {
        public Form52()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
        public ListBox mb = new ListBox();
        private void Form52_Load(object sender, EventArgs e)
        {
          
            
            label1.Text = "Danh sách sinh viên lớp";
            label2.Text = "Danh sách sinh viên tham gia bóng đá";

           string[] Text ={"Pham Vu Ngoc Ha","Hoang Van Hung","Le Thi Van","Nguyen Thi Thu",
                "Le Van Quoc","Le Van Phuoc", "Tran Van Dung","Tran The Anh","Nguyen Thi Lan Huong"};    
            foreach (string i in Text)
            {
                listBox1.Items.Add(i);
            }    
           // this.listBox1.DataSource = Text;
            //ListBox lb = new ListBox();
            //lb.DataSource = Text;
            button1.Text = "Chọn";
            button2.Text = "Xóa";
          
        }

        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            int chon = listBox1.SelectedItems.Count - 1;
            for (int i = chon;i>= 0; i--)
            {
                listBox2.Items.Add(listBox1.SelectedItems[i]);
                listBox1.Items.Remove(listBox1.SelectedItems[i]);
              
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            int i = listBox2.SelectedItems.Count - 1;
            while (i >= 0)
            {
                listBox1.Items.Add(listBox2.SelectedItems[i]);
                listBox2.Items.RemoveAt(listBox2.SelectedIndices[i]);
                i--;
            }
        }
    }
}
