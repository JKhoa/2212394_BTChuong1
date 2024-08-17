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
    public partial class Form60 : Form
    {
        public Form60()
        {
            InitializeComponent();
        }

        private void Form60_Load(object sender, EventArgs e)
        {
            string[] clbMonHoc = {"CC và MT LT 1", "Cơ sở dữ liệu", "Tiếng Anh 2",
                "Quản trị mạng", "Photoshop", "Đồ án","Tin học cơ sở"};
            foreach (string c in clbMonHoc)
            {
                this.checkedListBox1.Items.Add(c);
            }    
        }

        private void checkedListBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
