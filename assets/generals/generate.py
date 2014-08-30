COUNT = 1

def draw(G1_text, G2_text, top_text, left_text, right_text, draw):
    global COUNT

    with open("cap" + `COUNT` + ".tex", "w") as f:
        f.write("\\input{preamble.tex}\n")
        f.write("\\begin{document}\n")
        f.write("\\capnet{%s}{%s}{%s}{%s}{%s}{%s}\n" % 
                (G1_text, G2_text, top_text, left_text, right_text, str(draw).lower()))
        f.write("\\end{document}\n")

        COUNT += 1

def main():
    draw("$v_0$", "$v_0$", "", "", "", True)
    
    draw("$v_0$", "$v_0$", "", "write $v_1$ $\\nwarrow$", "", True)
    draw("$v_1$", "$v_0$", "", "", "", True)
    draw("$v_1$", "$v_0$", "", "done $\searrow$", "", True)

    draw("$v_0$", "$v_0$", "", "read $\\nwarrow$", "", True)
    draw("$v_0$", "$v_0$", "", "$v_0 \searrow$", "", True)
    
    draw("$v_0$", "$v_0$", "", "write $v_1$ $\\nwarrow$", "", True)
    draw("$v_1$", "$v_0$", "", "", "", True)
    draw("$v_1$", "$v_0$", "", "done $\\searrow$", "", True)
    draw("$v_1$", "$v_0$", "", "", "$\\nearrow read$", True)
    draw("$v_1$", "$v_0$", "", "", "$\\swarrow v_0$", True)
    
    draw("$v_0$", "$v_0$", "", "write $v_1$ $\\nwarrow$", "", True)
    draw("$v_1$", "$v_0$", "", "", "", True)
    draw("$v_1$", "$v_0$", "$v_1 \\rightarrow$", "", "", True)
    draw("$v_1$", "$v_1$", "", "", "", True)
    draw("$v_1$", "$v_1$", "$\\leftarrow$ done", "", "", True)
    draw("$v_1$", "$v_1$", "", "done $\\searrow$", "", True)
    draw("$v_1$", "$v_1$", "", "", "$\\nearrow read$", True)
    draw("$v_1$", "$v_1$", "", "", "$\\swarrow v_1$", True)
    
    draw("$v_0$", "$v_0$", "", "", "", False)

    draw("$v_0$", "$v_0$", "", "", "", False)
    
    draw("$v_0$", "$v_0$", "", "write $v_1$ $\\nwarrow$", "", False)
    draw("$v_1$", "$v_0$", "", "", "", False)
    draw("$v_1$", "$v_0$", "", "done $\searrow$", "", False)
    
    draw("$v_1$", "$v_0$", "", "", "$\\nearrow read$", False)
    draw("$v_1$", "$v_0$", "", "", "$\\swarrow v_0$", False)

if __name__ == "__main__":
    main()
